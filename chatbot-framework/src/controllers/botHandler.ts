import moment from 'moment';
import { ConversationDict } from '../interfaces/conversationDetails'
import { getquote } from '../services/kanyeQuote';
import { Message, Sender } from '../Schemas/message';
import { startConversation, addMessagesToConversation, endConverstion } from './conversation';

export const handleBotChat = (bot) => {
  const conversationDetails: ConversationDict = {};

  bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId: number = msg.chat.id;
    const email: string = match[1];
    conversationDetails[chatId] = { email, startTime: moment() };
    const botResponse: string = 'Hi, how can i help you today?';
    try {
      await bot.sendMessage(chatId, botResponse);
    } catch (error) {
      console.error('Error while sending message on telegram');
    }
    const messages: Message[] = [{ text: msg.text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
    startConversation(email, chatId, messages);
  });

  bot.onText(/\/freetext (.+)/, async (msg, match) => {
    const chatId: number = msg.chat.id;
    const text: string = match[1];
    const botResponse: string = await getquote();
    try {
      await bot.sendMessage(chatId, botResponse);
    } catch (error) {
      console.error('Error while sending message on telegram');
    }
    const messages: Message[] = [{ text: msg.text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
    const { email } = conversationDetails[chatId];
    addMessagesToConversation(email, chatId, messages);
  });

  bot.onText(/\/getinfo/, async (msg) => {
    const chatId: number = msg.chat.id;
    // Todo: get statics
    const botResponse: string = `Number of messages 5\nAvg converction time 3.4 sec `;
    try {
      await bot.sendMessage(chatId, botResponse);
    } catch (error) {
      console.error('Error while sending message on telegram');
    }
    const messages: Message[] = [{ text: msg.text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
    const { email } = conversationDetails[chatId];
    addMessagesToConversation(email, chatId, messages);
  });

  bot.onText(/\/end/, async (msg) => {
    const chatId: number = msg.chat.id;
    const botResponse: string = 'OK, we are done here';
    try {
      await bot.sendMessage(chatId, botResponse);
    } catch (error) {
      console.error('Error while sending message on telegram');
    }
    const messages: Message[] = [{ text: msg.text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
    const { email, startTime } = conversationDetails[chatId];
    const duration = moment().diff(startTime);
    endConverstion(email, chatId, messages, duration);
    delete conversationDetails[chatId];
  });

  bot.onText(/(.+)/, async (msg) => {
    const chatId: number = msg.chat.id;
    const botResponse: string = 'Sorry, didn\'t get it.'
    try {
      await bot.sendMessage(chatId, botResponse);
    } catch (error) {
      console.error('Error while sending message on telegram');
    }
    const messages: Message[] = [{ text: msg.text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
    const { email } = conversationDetails[chatId];
    addMessagesToConversation(email, chatId, messages);
  });
}