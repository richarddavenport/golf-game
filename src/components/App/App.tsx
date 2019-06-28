import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Game from '../Game/Game';
import Games from '../Games/Games';
// import { db } from '../../api/firebase';

export default () => {
  // const data = {
  //   tournamentId: '2019-06-27_524',
  //   users: [
  //     'D6hAKMFPGcSQp9X7EJETrCly6SH3',
  //     '0BfWbpt6mNQY2ZWtby8i5UxuAqE3',
  //     'rBOAPqzF4UMKE8EM9zHkT4sbqcv2',
  //     'JVvk0sFUlTMbYcezVYurVqUOALg2',
  //     'B5RMyvLKJXhNjn4w6Z0hMk2XO4l2'
  //   ],
  //   players: [
  //     {
  //       playerId: '27095',
  //       uid: 'rBOAPqzF4UMKE8EM9zHkT4sbqcv2'
  //     },
  //     {
  //       uid: 'rBOAPqzF4UMKE8EM9zHkT4sbqcv2',
  //       playerId: '23983'
  //     },
  //     {
  //       playerId: '25804',
  //       uid: 'rBOAPqzF4UMKE8EM9zHkT4sbqcv2'
  //     },
  //     {
  //       playerId: '20229',
  //       uid: 'rBOAPqzF4UMKE8EM9zHkT4sbqcv2'
  //     },
  //     {
  //       uid: '0BfWbpt6mNQY2ZWtby8i5UxuAqE3',
  //       playerId: '32876'
  //     },
  //     {
  //       uid: '0BfWbpt6mNQY2ZWtby8i5UxuAqE3',
  //       playerId: '34360'
  //     },
  //     {
  //       uid: '0BfWbpt6mNQY2ZWtby8i5UxuAqE3',
  //       playerId: '24781'
  //     },
  //     {
  //       uid: '0BfWbpt6mNQY2ZWtby8i5UxuAqE3',
  //       playerId: '29478'
  //     },
  //     {
  //       playerId: '25804',
  //       uid: 'JVvk0sFUlTMbYcezVYurVqUOALg2'
  //     },
  //     {
  //       playerId: '46601',
  //       uid: 'JVvk0sFUlTMbYcezVYurVqUOALg2'
  //     },
  //     {
  //       uid: 'JVvk0sFUlTMbYcezVYurVqUOALg2',
  //       playerId: '30925'
  //     },
  //     {
  //       uid: 'JVvk0sFUlTMbYcezVYurVqUOALg2',
  //       playerId: '46402'
  //     }
  //   ],
  //   gameName: 'Rocket Man'
  // };
  // db.doc('games/WeKEbJ6axgU8nxmOAITS').set(data);

  return (
    <>
      <AppBar />
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/games" exact component={Games} />
        <Route path="/games/:gameId" component={Games} />
        <Redirect to="/games" />
      </Switch>
    </>
  );
};
