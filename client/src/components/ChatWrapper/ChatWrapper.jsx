import React from 'react';
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
    height: 'calc(100vh - 40px)',
    minHeight: '600px',
  }
}));

function ChatWrapper() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <Grid
        className={classes.wrapper}
        container
        direction="row"
        justify="center"
        alignItems="strech"
        spacing={0}>
        <Grid item xs={3}>
          <UserList />
        </Grid>
        <Grid item xs={9}>
          <Conversation />
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatWrapper;
