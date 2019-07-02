import React from 'react';

const TeamTable = ({ team }) => (
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
      {team.map(player => (
        <tr key={player.player_id}>
          <td>
            {player.player_bio.first_name} {player.player_bio.last_name}
          </td>
          <td>
            {player.thru}
            {player.status === 'cut' && <span style={{ fontStyle: 'italic' }}>cut</span>}
            {player.status === 'wd' && <span style={{ fontStyle: 'italic' }}>withdrew</span>}
          </td>
          <td>{player.current_position}</td>
          <td>{player.today}</td>
          <td>{player.total}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TeamTable;
