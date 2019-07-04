import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Scratch from './components/Scratch/Scratch';
import Game from './pages/Game/Game';
import Games from './pages/Games/Games';
import Team from './pages/Team/Team';

export default () => (
  <>
    <AppBar />
    <Switch>
      <Route path="/games" exact component={Games} />
      <Route path="/games/:gameId" component={Game} />
      <Route path="/team/:gameId" exact component={Team} />
      <Route path="/scratch" component={Scratch} />
      <Redirect to="/games" />
    </Switch>
  </>
);
