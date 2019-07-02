import sortBy from 'lodash/sortBy';
import React from 'react';
import { Game } from '../../../functions/src/models';
import TeamTable from '../TeamTable/TeamTable';

export interface ScoreboardProps {
  game: Game;
}

const Scoreboard: React.FunctionComponent<ScoreboardProps> = ({ game }) => {
  return (
    <>
      {sortBy(game.scoreboard, [s => s.score]).map((scorecard, i) => (
        <div key={scorecard.uid}>
          <h1>
            {i + 1} - {game.users[scorecard.uid].displayName} {scorecard.score}
          </h1>
          <TeamTable team={scorecard.team} />
        </div>
      ))}
    </>
  );
};

export default Scoreboard;
