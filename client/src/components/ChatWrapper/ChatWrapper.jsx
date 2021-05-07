import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserList from '../UserList';
import Conversation from '../Conversation';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    maxWidth: '1440px',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,.06),0 2px 5px 0 rgba(0,0,0,.2)',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  wrapper: {
    height: 'calc(100vh - 100px)',
    minHeight: '600px',
  },
  userListWrapper: {
    height: '100%',
  },
  conversationWrapper: {
    height: '100%',
  }
}));

function ChatWrapper() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState();

  const userChoosen = useCallback((email) => {
    setCurrentUser(email);
  }, []);


  return (
    <div className={classes.root}>
      <Grid
        className={classes.wrapper}
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={0}>
        <Grid
          className={classes.userListWrapper}
          item
          xs={3}
        >
          <UserList userChoosen={userChoosen} />
        </Grid>
        <Grid
          className={classes.conversationWrapper}
          item
          xs={9}
        >
          <Conversation currentUser={currentUser} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatWrapper;
