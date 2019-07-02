import React, { useState } from 'react';
import { useDocument } from '../useDocument/useDocument';
import PlayersDropDown from '../PlayersDropDown/PlayersDropDown';

const AddPlayersToGame = ({ game, user }) => {
  const [state, setState] = useState({
    players: []
  });

  const tournament = useDocument(`tournaments/${game.data.tournamentId}`);

  if (tournament === undefined) return null;

  const handlePlayer = index => event => {
    const players = [...state.players];
    players[index] = event.target.value;

    setState({ players });
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
    <div style={{ margin: 10 }}>
      <label>
        Golfer {index + 1}:
        <PlayersDropDown
          value={state.players[index]}
          onChange={handlePlayer(index)}
          players={tournament.leaderboard.players} // TODO: should come from game players
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
      <input type="submit" value="Submit" disabled={state.players.length < 3} />
    </form>
  );
};

export default AddPlayersToGame;
