import React, { useState } from 'react';
import { useDocument } from '../useDocument/useDocument';
import PlayersDropDown from '../PlayersDropDown/PlayersDropDown';

const AddPlayersToGame = ({ game, user }) => {
  const [state, setState] = useState({
    players: ['', '', '', '']
  });

  const tournament = useDocument(`tournaments/${game.data.tournamentId}`);

  const handlePlayer = index => event => {
    setState({
      ...state,
      players: state.players.map((player, i) => (i === index ? event.target.value : player))
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    game.ref.update({
      players: [
        ...(game.data.players || []),
        ...state.players.map(player => ({
          uid: user.uid,
          playerId: player
        }))
      ]
    });
  };

  const buildDropDown = index => (
    <div>
      <label>
        Golfer {index + 1}:
        <PlayersDropDown
          value={state.players[index]}
          onChange={handlePlayer(index)}
          players={tournament.leaderboard}
        />
      </label>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {buildDropDown(0)}
      {buildDropDown(1)}
      {buildDropDown(2)}
      {buildDropDown(3)}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AddPlayersToGame;
