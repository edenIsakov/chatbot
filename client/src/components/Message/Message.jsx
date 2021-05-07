import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(100),
    },
    justifyContent: props => props.isUserMessage
      ? 'flex-start'
      : 'flex-end',
  },
  messageContainer: {
    padding: theme.spacing(2),
    textAlign: props => props.isUserMessage
      ? 'left'
      : 'right',
    backgroundColor: props => props.isUserMessage
      ? 'white'
      : '#dcf8c6',
  }
}));
function Message({ isUserMessage, message }) {
  const classes = useStyles({ isUserMessage });

  return (
    <div className={classes.root}>
      <Paper
        className={classes.messageContainer}
        elevation={3}
      >
        <Typography
          variant={'overline'}>
          {isUserMessage ? 'User' : 'Bot'}
        </Typography>
        <Typography>{message}</Typography>
      </Paper>

    </div >
  );
}

export default Message;