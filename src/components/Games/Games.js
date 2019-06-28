import React from 'react';
import AddGame from '../AddGame/AddGame';
import Game from '../Game/Game';
import GameInfo from '../GameInfo/GameInfo';
import withCollectionWithIds from '../withCollectionWithIds/withCollectionWithIds';

const Games = ({ collection: games, match }) => {
  if (!games) return null;

  const game = match.params.gameId && games.find(game => game.id === match.params.gameId);

  return match.params.gameId ? (
    <Game game={game} />
  ) : (
    <>
      <h1>Create Game: </h1>
      <AddGame />
      <h1>Current Games: </h1>
      {games.map(game => (
        <GameInfo key={game.id} game={game} />
      ))}
    </>
  );
};

export default withCollectionWithIds('games')(Games);
