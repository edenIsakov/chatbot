import TelegramBot from 'node-telegram-bot-api';
import moment from 'moment';
import config from 'config';
import { ConvercetionDetails } from './interfaces/convercetionDetails'
import { getquote } from './services/kanyeQuote';

const botToken: string = config.get('botToken');
// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(botToken, {
  polling: true,
  onlyFirstMatch: true,
});

const convercetionDetails: ConvercetionDetails = {};

bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId: number = msg.chat.id;
  const email: string = match[1];
  convercetionDetails[chatId] = { email, startTime: moment() };
  const botResponse: string = 'Hi, how can i help you today?';
  //Todo: Add user to db
  bot.sendMessage(chatId, botResponse);
});

bot.onText(/\/freetext (.+)/, async (msg, match) => {
  const chatId: number = msg.chat.id;
  const text: string = match[1];
  const botResponse: string = await getquote();
  //Todo: Add chat to db
  bot.sendMessage(chatId, botResponse);
});

bot.onText(/\/getinfo/, async (msg) => {
  const chatId: number = msg.chat.id;
  const botResponse: string = `Number of messages 5\nAvg converction time 3.4 sec `;
  //Todo: Add chat to db
  bot.sendMessage(chatId, botResponse);
});

bot.onText(/\/end/, async (msg) => {
  const chatId: number = msg.chat.id;
  const botResponse: string = 'OK, we are done here';
  //Todo: Add chat to db
  bot.sendMessage(chatId, botResponse);
  const endTime = moment();
  delete convercetionDetails[chatId];
});

bot.onText(/(.+)/, (msg) => {
  const chatId: number = msg.chat.id;
  const botResponse: string = 'Sorry, didn\'t get it.'
  //Todo: Add chat to db
  bot.sendMessage(chatId, botResponse);
});