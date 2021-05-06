import { makeStyles } from '@material-ui/core/styles';
import UserCard from '../UserCard';
import Search from '../Search';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // borderRight: '1px solid',
  },
}));

function UserList() {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Search />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
}

export default UserList;
