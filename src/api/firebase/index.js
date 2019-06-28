import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyAQTWWrli1G1vAzTWzf_0Z6zmu2BKObiOY',
  authDomain: 'golf-game-8068b.firebaseapp.com',
  databaseURL: 'https://golf-game-8068b.firebaseio.com',
  projectId: 'golf-game-8068b',
  storageBucket: 'golf-game-8068b.appspot.com',
  messagingSenderId: '92080816976',
  appId: '1:92080816976:web:87c00b24b16f7393'
});

const db = app.firestore();
const auth = app.auth();

export { db, auth };
