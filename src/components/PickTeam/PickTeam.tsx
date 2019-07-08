import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { GamePlayer, GamePlayers } from '../../../functions/src/models';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  }
}));

interface PickTeamProps {
  gamePlayers: GamePlayers;
  selectPlayer: (playerId: string, gamePlayer: GamePlayer) => void;
  deselectPlayer: (playerId: string, gamePlayer: GamePlayer) => void;
  uid: string;
}

const PickTeam: React.FunctionComponent<PickTeamProps> = ({
  gamePlayers,
  selectPlayer,
  deselectPlayer,
  uid
}) => {
  const classes = useStyles();
  const numSelected = Object.entries(gamePlayers).reduce(
    (acc, [_, { team }]) => acc + (team ? 1 : 0),
    0
  );

  const onClick = (playerId: string, gamePlayer: GamePlayer) => (
    event: React.MouseEvent<unknown>
  ) => {
    const onDifferentTeam = Boolean(gamePlayer.team) && gamePlayer.team !== uid;
    const onTeam = gamePlayer.team === uid;

    if (onDifferentTeam) return;

    if (onTeam) return deselectPlayer(playerId, gamePlayer);

    if (numSelected === 4) return;

    selectPlayer(playerId, gamePlayer);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'}>
            <TableBody>
              {Object.entries(gamePlayers).map(([playerId, gamePlayer]) => {
                const playerIsSelected = Boolean(gamePlayer.team);
                const onDifferentTeam = playerIsSelected && gamePlayer.team !== uid;

                return (
                  <TableRow
                    hover
                    onClick={onClick(playerId, gamePlayer)}
                    role="checkbox"
                    aria-checked={playerIsSelected}
                    tabIndex={-1}
                    key={gamePlayer.player_id}
                    selected={playerIsSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={playerIsSelected}
                        disabled={(onDifferentTeam && playerIsSelected) || numSelected === 4}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {gamePlayer.player_bio.last_name}, {gamePlayer.player_bio.first_name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

export default PickTeam;
