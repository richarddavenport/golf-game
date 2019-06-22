import React, { useState } from 'react';
import withDocument from './withDocument';
import { db } from './firebase';

function AddUser({ doc: tournament }) {
  const [state, setState] = useState({
    userName: '',
    players: ['', '', '', '']
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handlePlayer = index => event => {
    setState({
      ...state,
      players: state.players.map((player, i) => (i === index ? event.target.value : player))
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    db.collection('tournaments/034_2019-06-20/users')
      .add(state)
      .then(() =>
        setState({
          userName: '',
          players: ['', '', '', '']
        })
      )
      .catch(console.error);
  };

  const PlayersDropDown = ({ value, onChange }) => (
    <select onChange={onChange} defaultValue={value}>
      {console.log(tournament)}
      {tournament &&
        tournament.blob &&
        tournament.blob.leaderboard.players.map(player => (
          <option key={player.player_id} value={player.player_id}>
            {player.player_bio.last_name}, {player.player_bio.first_name}
          </option>
        ))}
    </select>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={state.userName} onChange={handleChange('userName')} />
        </label>
      </div>
      <div>
        <label>
          Player 1:
          <PlayersDropDown value={state.players[0]} onChange={handlePlayer(0)} />
        </label>
      </div>
      <div>
        <label>
          Player 2:
          <PlayersDropDown value={state.players[1]} onChange={handlePlayer(1)} />
        </label>
      </div>
      <div>
        <label>
          Player 3:
          <PlayersDropDown value={state.players[2]} onChange={handlePlayer(2)} />
        </label>
      </div>
      <div>
        <label>
          Player 4:
          <PlayersDropDown value={state.players[3]} onChange={handlePlayer(3)} />
        </label>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}

const Tournament = withDocument('tournaments', '034_2019-06-20')(AddUser);
export default Tournament;
