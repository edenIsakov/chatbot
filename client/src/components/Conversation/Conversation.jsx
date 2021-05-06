import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '1px solid rgba(0,0,0,0.08)',
    height: '100%',
  },
  top: {
    // backgroundColor: '#ededed',
    backgroundColor: '#f6f6f6',

    borderBottom: '1px solid #f2f2f2',
    height: '50px',
  },
  userDetails: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 16px',
    height: '100%',
  },
  text: {
    margin: '15px',
  }
}));

const user = `Edena1995@gmailcom`;

function Conversation() {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.userDetails}>
          <Avatar spacing={2}>
            <PersonIcon />
          </Avatar>
          <Typography
            className={classes.text}
            noWrap
          >
            {user}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
