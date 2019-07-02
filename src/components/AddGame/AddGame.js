import React, { useState } from 'react';
// import { db } from '../../api/firebase';
import withCollectionWithIds from '../withCollectionWithIds/withCollectionWithIds';
import withUser from '../withUser/withUser';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function AddGame({ collection: tournaments, user }) {
  const [gameName, setGameName] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [rules, setRules] = useState({
    pickSamePlayers: true,
    top25once: false
  });

  if (!tournaments || !user) return null;

  const handleGameName = event => setGameName(event.target.value);
  const handleTournamentId = event => setTournamentId(event.target.value);
  const handleRules = name => event => setRules({ ...rules, [name]: event.target.checked });

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const gameData = {
      gameName,
      tournamentId,
      rules,
      users: [user]
    };
    console.log(gameData);
    // db.collection('games')
    //   .add()
    //   .then(console.log)
    //   .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Game Name:
          <input type="text" value={gameName} onChange={handleGameName} />
        </label>
      </div>
      <div>
        <label>
          Tournament:
          <select style={{ maxWidth: 200 }} value={tournamentId} onChange={handleTournamentId}>
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
      <FormControl component="fieldset">
        <FormLabel component="legend">Rules</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={rules.pickSamePlayers}
                onChange={handleRules('pickSamePlayers')}
                color="primary"
              />
            }
            label="Pick the same players"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rules.top25once}
                onChange={handleRules('top25once')}
                color="primary"
              />
            }
            label="Pick top 25 players only once"
          />
        </FormGroup>
      </FormControl>
      <div>
        <input type="submit" value="Submit" disabled={!gameName || !tournamentId || true} />
      </div>
    </form>
  );
}

const User = withUser(AddGame);
const Tournaments = withCollectionWithIds('tournaments')(User);
export default Tournaments;
