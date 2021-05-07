import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Message from '../Message';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '1px solid rgba(0,0,0,0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
  },
  messagesWrapper: {
    height: '100%',
    overflowY: 'auto',
    padding: '10px',
  }
}));

const user = `Edena1995@gmailcom`;
const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
      <div className={classes.messagesWrapper}>
        <Message isUserMessage={true} message={message} />
        <Message isUserMessage={false} message={'asdasdc sad sd asd ads asd '} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
        <Message isUserMessage={true} message={'dasd asdas dasda sasdsadas asd  asdasd asdasd asdasd asdasdaeasdasdae asdasdaew as'} />
      </div>
    </div>
  );
}

export default Conversation;
