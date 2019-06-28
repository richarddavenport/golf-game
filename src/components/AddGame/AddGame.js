import React, { useState } from 'react';
import { db } from '../../api/firebase';
import withCollectionWithIds from '../withCollectionWithIds/withCollectionWithIds';
import withUser from '../withAuth/withAuth';

function AddGame({ collection: tournaments, user }) {
  const [state, setState] = useState({
    gameName: '',
    tournamentId: ''
  });

  if (!tournaments || !user) return null;

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    db.collection('games')
      .add({
        ...state,
        users: [user.uid]
      })
      .then(console.log)
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Game Name:
          <input type="text" value={state.gameName} onChange={handleChange('gameName')} />
        </label>
      </div>
      <div>
        <label>
          Tournament:
          <select
            style={{ maxWidth: 200 }}
            value={state.tournamentId}
            onChange={handleChange('tournamentId')}
          >
            <option value="" />
            {tournaments.map(tournament => {
              const { tour_name, tournament_name } = tournament.data.leaderboard;
              return (
                <option key={tournament.id} value={tournament.id}>
                  {tour_name} - {tournament_name}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <input type="submit" value="Submit" disabled={!state.tournamentId} />
    </form>
  );
}

const User = withUser(AddGame);
const Tournaments = withCollectionWithIds('tournaments')(User);
export default Tournaments;
