import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios, { AxiosPromise } from 'axios';
import { LeaderboardResponse } from './models';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const tournaments = db.collection('tournaments');

const tours = ['c', 'h', 'm', 'r', 's'];

const fetchTourLeaderboard = (tour: string) => axios(`https://statdata.pgatour.com/${tour}/current/message.json`)
    .then(({ data: { tid } }) => axios(`https://statdata.pgatour.com/${tour}/${tid}/leaderboard-v2mini.json`) as AxiosPromise<LeaderboardResponse>)
    .then(({ data }) => tournaments.doc(`${data.leaderboard.start_date}_${data.leaderboard.tournament_id}`).set(data, { merge: true }));

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
