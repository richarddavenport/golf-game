import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Game from '../Game/Game';
import Games from '../Games/Games';

export default () => {
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
