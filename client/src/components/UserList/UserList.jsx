import { makeStyles } from '@material-ui/core/styles';
import UserCard from '../UserCard';
import Search from '../Search';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
    // borderRight: '1px solid',
  },
  listWrapper: {
    overflowY: 'auto',
    height: '100%'
  }
}));

function UserList() {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Search />
      <div className={classes.listWrapper}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>

    </div>
  );
}

export default UserList;
