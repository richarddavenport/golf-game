import React from 'react';
import AddPlayersToGame from '../../components/AddPlayersToGame/AddPlayersToGame';
import { useDocument } from '../../components/useDocument/useDocument';

const Team = ({ match }) => {
  const { gameId } = match.params;
  const game = useDocument(`games/${gameId}`);
  if (game === undefined) return null;
  return (
    <>
      {/* TODO: if not in game, join game */}
      <div>
        <AddPlayersToGame game={game} />
      </div>
    </>
  );
};

export default Team;
