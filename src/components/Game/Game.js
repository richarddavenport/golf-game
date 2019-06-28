import React from 'react';
import Player from '../Player/Player';
import { useDocument } from '../useDocument/useDocument';

function Game({ game }) {
  const { data } = game;
  const tournament = useDocument(`tournaments/${game.data.tournamentId}`);

  return (
    <div>
      {tournament &&
        data.users.map(uid => (
          <Player
            key={uid}
            uid={uid}
            tournament={tournament}
            players={data.players.filter(player => player.uid === uid)}
          />
        ))}
    </div>
  );
}

export default Game;
