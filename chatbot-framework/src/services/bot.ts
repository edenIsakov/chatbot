
import moment from 'moment';
import { addMessagesToConversation, endConverstion, getstatics, startConversation } from '../controllers/conversation';
import { ConversationDict } from '../interfaces/conversationDetails'
import { Message, Sender } from '../Schemas/message';
import { getquote } from './kanyeQuote';
import GUID from 'guid';


const conversationDetails: ConversationDict = {};

const start = async (chatId: number, email: string, text: string, bot, io) => {
  conversationDetails[chatId] = { email, startTime: moment() };
  const botResponse: string = 'Hi, how can i help you today?';
  const messages: Message[] = [{ text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
  try {
    await bot.sendMessage(chatId, botResponse);
    io.emit(email, [{ ...messages[0], _id: GUID.create() }, { ...messages[1], _id: GUID.create() }]);
  } catch (error) {
    console.error('Error while sending message on telegram');
  }
  try {
    await startConversation(email, chatId, messages);
  } catch (error) {
    console.error('Error while saving converstion', error);
  }
}

const freetext = async (chatId: number, text: string, bot, io) => {
  const botResponse: string = await getquote();
  const { email } = conversationDetails[chatId];
  const messages: Message[] = [{ text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
  try {
    await bot.sendMessage(chatId, botResponse);
    io.emit(email, [{ ...messages[0], _id: GUID.create() }, { ...messages[1], _id: GUID.create() }]);
  } catch (error) {
    console.error('Error while sending message on telegram');
  }
  try {
    await addMessagesToConversation(email, chatId, messages);
  } catch (error) {
    console.error('Error while adding message to converstion', error);
  }
}

const getinfo = async (chatId: number, text: string, bot, io) => {
  const { email } = conversationDetails[chatId];
  let botResponse: string;
  try {
    const { count, avg } = await getstatics(email);
    botResponse = `Number of messages ${count}\nAvg converction time ${avg} sec `;
  } catch (error) {
    botResponse = `Failed to get statics`;
  }
  const messages: Message[] = [{ text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
  try {
    await bot.sendMessage(chatId, botResponse);
    io.emit(email, [{ ...messages[0], _id: GUID.create() }, { ...messages[1], _id: GUID.create() }]);
  } catch (error) {
    console.error('Error while sending message on telegram');
  }
  try {
    await addMessagesToConversation(email, chatId, messages);
  } catch (error) {
    console.error('Error while adding message to converstion', error);
  }
}

const end = async (chatId: number, text: string, bot, io) => {
  const botResponse: string = 'OK, we are done here';
  const messages: Message[] = [{ text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
  const { email, startTime } = conversationDetails[chatId];
  try {
    await bot.sendMessage(chatId, botResponse);
    io.emit(email, [{ ...messages[0], _id: GUID.create() }, { ...messages[1], _id: GUID.create() }]);
  } catch (error) {
    console.error('Error while sending message on telegram');
  }
  const duration = moment().diff(startTime, 'seconds');
  try {
    await endConverstion(email, chatId, messages, duration);
  } catch (error) {
    console.error('Error while ending converstion', error);
  }
  delete conversationDetails[chatId];
}

const defualtMessage = async (chatId: number, text: string, bot, io) => {
  const botResponse: string = 'Sorry, didn\'t get it.'
  const messages: Message[] = [{ text, sender: Sender.User }, { text: botResponse, sender: Sender.Bot }];
  const { email } = conversationDetails[chatId];
  try {
    await bot.sendMessage(chatId, botResponse);
    io.emit(email, [{ ...messages[0], _id: GUID.create() }, { ...messages[1], _id: GUID.create() }]);
  } catch (error) {
    console.error('Error while sending message on telegram');
  }
  try {
    await addMessagesToConversation(email, chatId, messages);
  } catch (error) {
    console.error('Error while adding message to converstion', error);
  }
}

export {
  start,
  freetext,
  getinfo,
  end,
  defualtMessage,
}