import React from 'react';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import { useDocument } from '../../components/useDocument/useDocument';
import withUser from '../../components/withUser/withUser';
import { Link } from 'react-router-dom';

function Game({ user, match }) {
  const { gameId } = match.params;

  const game = useDocument(`games/${gameId}`);

  return (
    user && (
      <>
        <Link to={`/team/${gameId}`}>Join Game!</Link>
        {game && <Scoreboard game={game} />}
      </>
    )
  );
}

export default withUser(Game);
