import React, { useState } from 'react';
// import { db } from '../../api/firebase';
import withCollectionWithIds from '../../components/withCollectionWithIds/withCollectionWithIds';
import withUser from '../../components/withUser/withUser';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { db } from '../../api/firebase';

function AddGame({ collection: tournaments, user, history }) {
  const [gameName, setGameName] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [rules, setRules] = useState({
    pickSamePlayers: true,
    top25once: false
  });

  if (!tournaments) return null;

  const handleGameName = event => setGameName(event.target.value);
  const handleTournamentId = event => setTournamentId(event.target.value);
  const handleRules = name => event => setRules({ ...rules, [name]: event.target.checked });

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const game = {
      gameName,
      tournamentId,
      rules,
      scoreboard: {
        [user.uid]: {
          score: 0,
          team: [],
          user: user.toJSON()
        }
      }
    };
    db.collection('games')
      .add(game)
      .then(ref => history.push(`/games/${ref.id}`))
      .catch(console.error);
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
            {tournaments
              .filter(tournament => !tournament.data.leaderboard.is_finished)
              .map(tournament => {
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
        <input type="submit" value="Submit" disabled={!gameName || !tournamentId} />
      </div>
    </form>
  );
}

const User = withUser(AddGame);
const Tournaments = withCollectionWithIds('tournaments')(User);
export default Tournaments;
