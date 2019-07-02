import React from 'react';
// import AddPlayersToGame from '../AddPlayersToGame/AddPlayersToGame';
import Document from '../Document/Document';
import withUser from '../withUser/withUser';
import Scoreboard from '../Scoreboard/Scoreboard';

function Game({ gameId, user }) {
  if (user === undefined) return null;

  return (
    <Document
      documentPath={`games/${gameId}`}
      document={game => {
        // const playersSelected = game.scoreboard.some(scorecard => scorecard.user.uid === user.uid);
        return (
          <>
            {/* {!playersSelected && (
              <div>
                <p>Pick your team!</p>
                <AddPlayersToGame game={game} user={user} />
              </div>
            )} */}
            <div>
              <Scoreboard game={game} />
            </div>
          </>
        );
      }}
    />
  );
}

export default withUser(Game);
