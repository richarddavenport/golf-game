import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios, { AxiosPromise } from 'axios';
import { LeaderboardData } from './models';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const getLeaderBoard = functions.pubsub.schedule('* * * * 0,3,4,5,6')
    .timeZone('America/New_York')
    .onRun(() => axios('https://statdata.pgatour.com/r/current/message.json')
        .then(({ data: { tid } }) => axios(`https://statdata.pgatour.com/r/${tid}/leaderboard-v2mini.json`) as AxiosPromise<LeaderboardData>)
        .then(({ data }) => {
            const tournamentDoc = `${data.leaderboard.tournament_id}_${data.leaderboard.start_date}`;
            return db.collection('tournaments').doc(tournamentDoc).set({ blob: data }, { merge: true });
        })
    );
