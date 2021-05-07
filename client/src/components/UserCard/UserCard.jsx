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
    borderTop: '1px solid #f2f2f2',
    borderRadius: '0',
    height: '72px',
  },
  details: {
    height: '100%',
    margin: 'auto',

  },
  text: {
    maxWidth: '80%',
  }
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

function UserCard() {
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
            item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div >
  );
}

export default UserCard;
