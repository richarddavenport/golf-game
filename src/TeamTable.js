import React from 'react';

const TeamTable = ({ players }) => (
  <table>
    <thead>
      <tr>
        <th>Player</th>
        <th>Thru</th>
        <th>Position</th>
        <th>Today</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {players.map(player => (
        <tr key={player.player_id}>
          <td>
            {player.player_bio.first_name} {player.player_bio.last_name}
          </td>
          <td>{player.thru}</td>
          <td>{player.current_position}</td>
          <td>{player.today}</td>
          <td>{player.total}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TeamTable;
