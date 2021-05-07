import { defualtMessage, end, freetext, getinfo, start } from '../services/bot';

export const handleBotChat = (bot, io) => {

  bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId: number = msg.chat.id;
    const email: string = match[1];
    const text: string = msg.text;
    await start(chatId, email, text, bot, io);
  });

  bot.onText(/\/freetext (.+)/, async (msg, match) => {
    const chatId: number = msg.chat.id;
    const text: string = msg.text;
    await freetext(chatId, text, bot, io);
  });

  bot.onText(/\/getinfo/, async (msg) => {
    const chatId: number = msg.chat.id;
    const text = msg.text;
    getinfo(chatId, text, bot, io);
  });

  bot.onText(/\//, async (msg) => {
    const chatId: number = msg.chat.id;
    const text: string = msg.text;
    end(chatId, text, bot, io);
  });

  bot.onText(/(.+)/, async (msg) => {
    const chatId: number = msg.chat.id;
    const text: string = msg.text;
    defualtMessage(chatId, text, bot, io);
  });
}