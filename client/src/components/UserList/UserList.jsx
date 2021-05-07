import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserCard from '../UserCard';
import Search from '../Search';
import axios from 'axios';
import config from '../../config'

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

function UserList({ userChoosen }) {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    async function getUsers() {
      const result = await axios.get(`${config.serverhost}/users`);
      setUsers(result.data);
      setAllUsers(result.data);
    }
    try {
      getUsers();
    } catch (error) {
      console.error('Falid fetching users from server');
    }
    return () => {
      setUsers([]);
    }
  }, []);

  const onSearch = useCallback((serchValue) => {
    if (serchValue) {
      setUsers(allUsers.filter((user) =>
        user.email.startsWith(serchValue)
      ));
    } else {
      setUsers(allUsers);
    }
  }, [allUsers]);


  return (
    <div className={classes.root}>
      <Search onSearch={onSearch} />
      <div className={classes.listWrapper}>
        {
          users.map(user =>
            <UserCard key={user._id} email={user.email} userChoosen={userChoosen} />
          )
        }
      </div>

    </div>
  );
}

export default UserList;
