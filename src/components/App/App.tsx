import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Game from '../Game/Game';
import GamesPage from '../GamesPage/GamesPage';
// import Scratch from '../Scratch/Scratch';

export default () => {
  return (
    <>
      <AppBar />
      {/* <Scratch /> */}
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/games" exact component={GamesPage} />
        <Route path="/games/:gameId" component={GamesPage} />
        <Redirect to="/games" />
      </Switch>
    </>
  );
};
