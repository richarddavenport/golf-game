import React from 'react';
import * as models from '../../../functions/src/models';
import PickTeam from '../../components/PickTeam/PickTeam';
import {
  useDocumentReducer,
  Document
} from '../../components/useDocumentReducer/useDocumentReducer';
import withUser from '../../components/withUser/withUser';

interface TeamProps {
  match: any;
  user: firebase.User;
}

function reducer(state: Document<models.Game>, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'snap':
      return {
        snapshot: action.payload,
        data: action.payload.data()
      } as Document<models.Game>;
    case 'selectPlayer':
      const { uid, playerId, gamePlayer } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          gamePlayers: {
            ...state.data.gamePlayers,
            [playerId]: {
              ...state.data.gamePlayers[playerId],
              team: uid
            }
          },
          scoreboard: {
            ...state.data.scoreboard,
            [uid]: {
              ...state.data.scoreboard[uid],
              team: {
                ...state.data.scoreboard[uid].team,
                [playerId]: gamePlayer
              }
            }
          }
        }
      } as Document<models.Game>;
  }
}

const Team: React.FC<TeamProps> = ({ match, user }) => {
  const { gameId } = match.params;
  const [game, dispatch, loading] = useDocumentReducer<models.Game>(`games/${gameId}`, reducer);

  if (loading) return null;

  const handleSelectPlayer = (playerId: string, gamePlayer: models.GamePlayer) => {
    dispatch({ type: 'selectPlayer', payload: { uid: user.uid, playerId, gamePlayer } });

    // game.snapshot.ref.update(
    //   `scoreboard.${user.uid}.team.${playerId}`,
    //   gamePlayer,
    //   `gamePlayers.${playerId}.team`,
    //   user.uid
    // );
  };

  const handleDeselectPlayer = (playerId: string, gamePlayer: models.GamePlayer) => {
    const team: models.Team = game.snapshot.get(`scoreboard.${user.uid}.team`);
    delete team[playerId];
    game.snapshot.ref.update(
      `scoreboard.${user.uid}.team`,
      team,
      `gamePlayers.${playerId}.team`,
      null
    );
  };

  return (
    <>
      {/* TODO: if not in game, join game */}
      <PickTeam
        gamePlayers={game.data.gamePlayers}
        selectPlayer={handleSelectPlayer}
        deselectPlayer={handleDeselectPlayer}
        uid={user.uid}
      />
    </>
  );
};

export default withUser(Team);
