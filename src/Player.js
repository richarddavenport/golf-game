import React from 'react';
import TeamTable from './TeamTable';

const Player = ({ blob, user }) => {
  const totalScore = () =>
    user.players
      .map(player_id => blob.leaderboard.players.find(player => player.player_id === player_id))
      .reduce((acc, cur) => acc + cur.total, 0);

  const players = user.players.map(player_id =>
    blob.leaderboard.players.find(player => player.player_id === player_id)
  );

  return (
    <div>
      <h1>
        {user.userName} {totalScore()}
      </h1>
      <TeamTable players={players} />
    </div>
  );
};

export default Player;
