import React from 'react';
import withCollectionWithIds from '../../components/withCollectionWithIds/withCollectionWithIds';
import { Game } from '../../../functions/src/models';
import { Link } from 'react-router-dom';
import { DocWithId } from '../../components/useCollectionWithIds/useCollectionWithIds';
import withUser from '../../components/withUser/withUser';

interface GamesProps {
  collection: DocWithId<Game>[];
  user: firebase.User;
}

const Games: React.FC<GamesProps> = ({ collection: games, user }) => {
  if (!games || !user) return null;

  return (
    <>
      <h1>Current Games: </h1>
      {games.map(game => {
        const { gameName, tournamentName, tournamentIsFinished, scoreboard } = game.data;
        return (
          !tournamentIsFinished && (
            <div key={game.id} style={{ marginBottom: 40 }}>
              <Link to={`games/${game.id}`}>
                <h3>
                  {gameName} - {tournamentName}
                </h3>
              </Link>
              <p>Current Players</p>
              <ul>
                {Object.entries(scoreboard).map(([uid, scorecard]) => (
                  <li key={uid}>{scorecard.user.displayName}</li>
                ))}
              </ul>
            </div>
          )
        );
      })}
    </>
  );
};

const User = withUser(Games);
export default withCollectionWithIds('games')(User);
