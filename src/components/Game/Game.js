import React from 'react';
import Player from '../Player/Player';
import { useDocument } from '../useDocument/useDocument';
import withUser from '../withUser/withUser';
import AddPlayersToGame from '../AddPlayersToGame/AddPlayersToGame';

function Game({ game, user }) {
  const { data } = game;
  const tournament = useDocument(`tournaments/${game.data.tournamentId}`);

  if (tournament === undefined || user === undefined) return null;

  const playersSelected = data.players.some(userPlayer => userPlayer.uid === user.uid);

  return (
    <>
      {!playersSelected && (
        <div>
          <p>Pick your team!</p>
          <AddPlayersToGame game={game} user={user} />
        </div>
      )}
      <div>
        {data.users.map(uid => (
          <Player
            key={uid}
            uid={uid}
            tournament={tournament}
            players={data.players.filter(player => player.uid === uid)}
          />
        ))}
      </div>
    </>
  );
}

export default withUser(Game);
