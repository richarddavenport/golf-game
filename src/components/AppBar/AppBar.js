import { default as MatAppBar } from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import GroupAdd from '@material-ui/icons/GroupAdd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../api/firebase';
import withUser from '../withUser/withUser';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
    color: '#fff'
  },
  title: {
    flexGrow: 1
  }
}));

const AppBar = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const logout = () => {
    handleDrawerClose();
    auth.signOut();
  };

  return (
    <>
      <MatAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Awesome Golf
          </Typography>
          {Boolean(user) && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="end"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </MatAppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button to="/create-game" component={Link} onClick={handleDrawerClose}>
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText primary="New Game" />
          </ListItem>
        </List>
        <List>
          <ListItem button to="/games" component={Link} onClick={handleDrawerClose}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button to="/login" onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default withUser(AppBar);
