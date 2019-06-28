import React from 'react';
import TeamTable from '../TeamTable/TeamTable';
import { useDocument } from '../useDocument/useDocument';

const Player = ({ tournament, players, uid }) => {
  const user = useDocument(`users/${uid}`);
  if (user === undefined) return null;

  const totalScore = () =>
    players
      .map(userPlayer =>
        tournament.leaderboard.players.find(player => player.player_id === userPlayer.playerId)
      )
      .reduce((acc, cur) => acc + cur.total, 0);

  const leaderboardPlayers = players.map(userPlayer =>
    tournament.leaderboard.players.find(player => player.player_id === userPlayer.playerId)
  );

  return (
    <div>
      <h1>
        {user.displayName} {totalScore()}
      </h1>
      <TeamTable players={leaderboardPlayers} />
    </div>
  );
};

export default Player;
