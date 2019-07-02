import React from 'react';
import Game from '../Game/Game';
import Games from '../Games/Games';

const GamesPage = ({ match }) => {
  const { gameId } = match.params;
  return gameId ? <Game gameId={gameId} /> : <Games />;
};

export default GamesPage;
