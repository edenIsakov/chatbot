import TelegramBot from 'node-telegram-bot-api';
import config from 'config';
import { connect } from 'mongoose';
import { handleBotChat } from './controllers/botHandler';

const botToken: string = config.get('botToken');
const mongodb: { host: string, port: number } = config.get('mongodb');


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