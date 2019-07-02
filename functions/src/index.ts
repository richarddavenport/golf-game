import axios, { AxiosPromise } from 'axios';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { LeaderboardResponse, Player, Scorecard, Game, Leaderboard } from './models';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const tournaments = db.collection('tournaments');

const tours = ['c', 'h', 'm', 'r', 's'];

const fetchTourLeaderboard = (tour: string) => axios(`https://statdata.pgatour.com/${tour}/current/message.json`)
    .then(({ data: { tid } }) => axios(`https://statdata.pgatour.com/${tour}/${tid}/leaderboard-v2mini.json`) as AxiosPromise<LeaderboardResponse>)
    .then(({ data }) => tournaments.doc(`${data.leaderboard.start_date}_${data.leaderboard.tournament_id}_${tour}`).set(data, { merge: true }));

export const getLeaderBoard = functions.pubsub.schedule('* * * * 0,3,4,5,6')
    .timeZone('America/New_York')
    .onRun(() => Promise.all(tours.map(fetchTourLeaderboard)));

export const createUser = functions.runWith({ memory: '128MB' }).auth.user()
    .onCreate(({ uid, ...rest }) => {
        const user = JSON.parse(JSON.stringify(rest));
        return admin.firestore().collection('users').doc(uid).create({
            ...user,
            uid,
        });
    });

// TODO: change so that it fills in the scoreboard if the game is started
// also run when a game is started
export const updateGamesLeaderBoard = functions.firestore
    .document('tournaments/{tournamentId}')
    .onUpdate(async (change, context) => {
        const { leaderboard } = change.after.data() || { leaderboard: { players: [] } };
        console.log('tournamentId: ', context.params.tournamentId);
        const games = await admin.firestore()
            .collection('games')
            .where('tournamentId', '==', context.params.tournamentId)
            .where('started', '==', true)
            .get();
        console.log('game siz: ', games.size)
        games.forEach(async game => {
            console.log('writing to: ', game.ref.path);
            const data = game.data();
            const scoreboard = (data as Game).scoreboard.map(scorecard => {
                const team = scorecard.team.map(player => {
                    return (leaderboard as Leaderboard).players.find(p => p.player_id === player.player_id)
                }).filter(Boolean);

                return {
                    ...scorecard,
                    score: (team as Player[]).reduce((acc: number, cur: Player) => acc + cur.total, 0),
                    team
                } as Scorecard;
            });
            await game.ref.update({
                tour: leaderboard.tour_name,
                tournamentName: leaderboard.tournament_name,
                tournamentIsFinished: leaderboard.is_finished,
                tournamentIsStarted: leaderboard.is_started,
                tournamentRoundState: leaderboard.round_state,
                scoreboard,
            });
        })
        console.log('done writing');
        return null;
    });

// setup for picking players, need to fill in players
export const onCreateGame = functions.firestore
    .document('games/{gameId}')
    .onCreate(async (change, context) => {
        // TODO
        // fill players based on rules
        return null;
    });
