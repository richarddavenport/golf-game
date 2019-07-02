import React from 'react';
import withCollectionWithIds from '../withCollectionWithIds/withCollectionWithIds';
import { Game } from '../../../functions/src/models';
import { Link } from 'react-router-dom';
import { DocWithId } from '../useCollectionWithIds/useCollectionWithIds';
import withUser from '../withUser/withUser';

interface GamesProps {
  collection: DocWithId<Game>[];
  user: firebase.User;
}

const Games: React.FunctionComponent<GamesProps> = ({ collection: games, user }) => {
  if (!games || !user) return null;

  return (
    <>
      <h1>Current Games: </h1>
      {games.map(game => {
        const { gameName, tournamentName, tournamentIsFinished, scoreboard, users } = game.data;
        return !tournamentIsFinished &&
          <div key={game.id} style={{ marginBottom: 40 }}>
            <Link to={`games/${game.id}`}>
              <h3>
                {gameName} - {tournamentName}
              </h3>
            </Link>
            <p>Current Players</p>
            <ul>
              {scoreboard.map(scorecard => (
                <li key={scorecard.uid}>{users[scorecard.uid].displayName}</li>
              ))}
            </ul>
          </div>
        {/* {!users.includes(user.uid) && <button onClick={onJoinGame}>Join Game</button>} */ }
        {/* TODO fix join game button */ }
      })}
    </>
  );
};

const User = withUser(Games);
export default withCollectionWithIds('games')(User);
