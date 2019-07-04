import React from 'react';
import AddPlayersToGame from '../../components/AddPlayersToGame/AddPlayersToGame';
import { useDocument } from '../../components/useDocument/useDocument';
import withUser from '../../components/withUser/withUser';

const Team = ({ user, match }) => {
  const { gameId } = match.params;
  const game = useDocument(`games/${gameId}`);
  if (game === undefined) return null;
  return (
    <>
      <div>
        <AddPlayersToGame game={game} user={user} />
      </div>
    </>
  );
};

export default withUser(Team);
