import React, { useState } from 'react';
import PickTeam from '../PickTeam/PickTeam';
import { useDocument } from '../useDocument/useDocument';
import withUser from '../withUser/withUser';

const AddPlayersToGame = ({ game, user }) => {
  const [state, setState] = useState([]);

  const handleSubmit = event => {
    const {} = game.data;
    event.preventDefault();
    event.stopPropagation();
    console.log(state);
    game.ref.update({
      scoreboard: {
        [user.uid]: {}
      }
      // players: [
      //   ...(game.data.players || []),
      //   ...state.players.map(player => ({
      //     uid: user.uid,
      //     playerId: player
      //   }))
      // ]
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {console.log('state: ', state)}
      <input type="submit" value="Submit" disabled={state.length !== 4} />
      <PickTeam gamePlayers={game.gamePlayers} setPlayers={setState} />
    </form>
  );
};

export default withUser(AddPlayersToGame);
