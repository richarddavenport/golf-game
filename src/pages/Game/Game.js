import React from 'react';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import { useDocumentSnapshot } from '../../components/useDocumentSnapshot/useDocument';
import withUser from '../../components/withUser/withUser';
import { Link } from 'react-router-dom';

function Game({ user, match }) {
  const { gameId } = match.params;

  const game = useDocumentSnapshot(`games/${gameId}`);

  return (
    user && (
      <>
        <Link to={`/team/${gameId}`}>Join Game!</Link>
        {game && (
          <>
            <h1>{game.get('gameName')}</h1>
            <Scoreboard game={game.data()} />
          </>
        )}
      </>
    )
  );
}

export default withUser(Game);
