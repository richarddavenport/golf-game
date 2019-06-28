import React from 'react';
import { Link } from 'react-router-dom';
import { useDocument } from '../useDocument/useDocument';
import UserInfo from '../UserInfo/UserInfo';
import withAuth from '../withAuth/withAuth';

const GameInfo = ({ game, user }) => {
  const tournament = useDocument(`tournaments/${game.data.tournamentId}`);

  if (user === undefined) return null;

  const onJoinGame = () => {
    game.ref.update({
      users: [...game.data.users, user.uid]
    });
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <Link to={`games/${game.id}`}>
        <h3>
          {game.data.gameName} - {tournament && tournament.leaderboard.tournament_name}
        </h3>
      </Link>
      <p>Current Players</p>
      <ul>
        {game.data.users.map(uid => (
          <li key={uid}>
            <UserInfo uid={uid} />
          </li>
        ))}
      </ul>
      {!game.data.users.includes(user.uid) && <button onClick={onJoinGame}>Join Game</button>}
    </div>
  );
};

export default withAuth(GameInfo);
