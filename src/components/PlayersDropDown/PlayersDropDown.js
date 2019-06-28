import React from 'react';

const PlayersDropDown = ({ value, onChange, players }) => (
  <select onChange={onChange} defaultValue={value}>
    <option value="" />
    {players.map(player => (
      <option key={player.player_id} value={player.player_id}>
        {player.player_bio.last_name}, {player.player_bio.first_name}
      </option>
    ))}
  </select>
);

export default PlayersDropDown;
