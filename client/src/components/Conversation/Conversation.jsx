import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Message from '../Message';
import axios from 'axios';
import config from '../../config';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '1px solid rgba(0,0,0,0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
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

function Conversation({ currentUser }) {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState({});
  const refEndMessage = useRef(null);
  const prevUser = usePrevious(currentUser);

  useEffect(() => {
    const currentSocket = io(config.serverhost, { transport: ['websocket'] });
    setSocket(currentSocket);
    return () => currentSocket.disconnect();
  }, []);

  const scrollToBottom = useCallback(() => {
    refEndMessage.current.scrollIntoView();
  }, []);

  useEffect(() => {
    async function getMessages() {
      const result = await axios.get(`${config.serverhost}/users/${currentUser}`);
      const allMessages = result.data;
      setMessages(allMessages);
    }
    if (currentUser) {
      getMessages();
    }
  }, [currentUser]);

  useEffect(() => {
    function listenToMessages() {
      socket.on(currentUser, (...args) => {
        const currentMessages = args[0];
        setMessages((prevMessages) => [...prevMessages, ...currentMessages]);
      });
    }
    if (currentUser && socket) {
      listenToMessages();
    }
  }, [currentUser, socket]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (prevUser && prevUser !== currentUser) {
      socket.off(prevUser);
    }
  }, [currentUser, prevUser, socket])

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
            {currentUser}
          </Typography>
        </div>
      </div>
      <div className={classes.messagesWrapper}>
        {
          messages.map((message) => (
            <Message key={message._id} isUserMessage={message.sender === 'user'} message={message.text} />
          ))
        }
        <div style={{ float: "left", clear: "both" }}
          ref={refEndMessage}>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
