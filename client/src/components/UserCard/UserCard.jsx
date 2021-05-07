import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',

  },
  paper: {
    borderBottom: '1px solid #f2f2f2',
    borderRadius: '0',
    height: '72px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f5f5f5',
    }
  },
  details: {
    height: '100%',
    margin: 'auto',

  },
  text: {
    maxWidth: '80%',
    textAlign: 'left',
  }
}));

function UserCard({ email }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid
          className={classes.details}
          direction="row"
          justify="center"
          alignItems="center"
          container wrap="nowrap"
          spacing={2}>
          <Grid item>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid
            className={classes.text}
            item
            xs
            zeroMinWidth>
            <Typography noWrap>{email}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div >
  );
}

export default UserCard;
