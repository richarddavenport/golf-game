import React from 'react';
import GameInfo from '../GameInfo/GameInfo';
import withCollectionWithIds from '../withCollectionWithIds/withCollectionWithIds';

const Games = ({ collection: games }) => {
  if (!games) return null;

  return (
    <>
      <h1>Current Games: </h1>
      {games.map(game => (
        <div key={game.id} style={{ marginBottom: 40 }}>
          <GameInfo game={game} />
        </div>
      ))}
    </>
  );
};

export default withCollectionWithIds('games')(Games);
