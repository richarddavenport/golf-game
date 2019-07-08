import { DocumentSnapshot } from '@google-cloud/firestore';
import axios, { AxiosPromise } from 'axios';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Game, Leaderboard, LeaderboardResponse, Team } from './models';

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

const addTournamentInfoAndScoreboardToGame = (gameSnap: DocumentSnapshot, leaderboard: Leaderboard) => {
    console.log('writing to: ', gameSnap.ref.path);
    const { scoreboard } = gameSnap.data() as Game;
    return gameSnap.ref.update({
        tour: leaderboard.tour_name,
        tournamentName: leaderboard.tournament_name,
        tournamentIsFinished: leaderboard.is_finished,
        tournamentIsStarted: leaderboard.is_started,
        tournamentRoundState: leaderboard.round_state,
        scoreboard: Object.entries(scoreboard).reduce((acc, [uid, scorecard]) => {
            const team = Object.entries(scorecard.team)
                .reduce((acc, [uid, player]) => ({
                    ...acc,
                    [uid]: {
                        ...scorecard.team[uid],
                        ...leaderboard.players.find(p => p.player_id === player.player_id),
                    }
                }), {}) as Team;

            return {
                ...acc,
                [uid]: {
                    ...scorecard,
                    score: Object.entries(team).reduce((acc: number, [uid, player]) => acc + player.total, 0),
                    team
                },
            }
        }, {}),
    });
}

// TODO: change so that it fills in the scoreboard if the game is started
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
        games.forEach(async game => await addTournamentInfoAndScoreboardToGame(game, leaderboard));
        console.log('done writing');
        return null;
    });

export const onCreateGame = functions.firestore
    .document('games/{gameId}')
    .onCreate(async (change, context) => {
        const { tournamentId } = change.data() || { tournamentId: null };
        const leaderboardResponse = (await admin.firestore()
            .doc(`tournaments/${tournamentId}`)
            .get())
            .data() as LeaderboardResponse;

        await addTournamentInfoAndScoreboardToGame(change, leaderboardResponse.leaderboard);

        const gamePlayers = leaderboardResponse.leaderboard.players.reduce((acc, cur) => ({
            ...acc,
            [cur.player_id]: cur
        }), {});

        return change.ref.update('gamePlayers', gamePlayers);
    });
