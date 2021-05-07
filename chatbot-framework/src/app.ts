import TelegramBot from 'node-telegram-bot-api';
import config from 'config';
import { connect } from 'mongoose';
import { handleBotChat } from './controllers/botHandler';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import users from './routes/users';

const botToken: string = config.get('botToken');
const mongodb: { host: string, port: number } = config.get('mongodb');
const port: number = config.get('port');

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

handleBotChat(bot);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/users', users);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
