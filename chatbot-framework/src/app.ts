import TelegramBot from 'node-telegram-bot-api';
import config from 'config';
import { connect } from 'mongoose';
import { handleBotChat } from './controllers/botHandler';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import users from './routes/users';

const botToken: string = config.get('botToken');
const mongodb: { host: string, port: number } = config.get('mongodb');
const port: number = config.get('port');
const crosOrigin: string = config.get('crosOrigin');

// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(botToken, {
  polling: true,
  onlyFirstMatch: true,
});

// Connect to mongodb
(async function () {
  await connect(`mongodb://${mongodb.host}:${mongodb.port}/chat`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
})();;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/users', users);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`listen on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: crosOrigin,
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });
});


handleBotChat(bot, io);