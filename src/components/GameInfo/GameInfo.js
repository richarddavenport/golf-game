import React from 'react';
import { Link } from 'react-router-dom';
import withUser from '../withUser/withUser';

const GameInfo = ({ game, user }) => {
  if (user === undefined) return null;

  const { gameName, tournamentName, scoreboard, users } = game.data;

  return (
    <>
      <Link to={`games/${game.id}`}>
        <h3>
          {gameName} - {tournamentName}
        </h3>
      </Link>
      <p>Current Players</p>
      <ul>
        {scoreboard.map(scorecard => (
          <li key={scorecard.uid}>{users[scorecard.uid].displayName}</li>
        ))}
      </ul>
      {/* {!users.includes(user.uid) && <button onClick={onJoinGame}>Join Game</button>} */}
      {/* TODO fix join game button */}
    </>
  );
};

export default withUser(GameInfo);
