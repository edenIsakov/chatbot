import { Message } from '../Schemas/message';
import {
  addOrFindUser,
  addNewConversation, addMessagesToUserConversation, addTimeDutationToConversation, countMessagesAndAvgTime
} from '../services/userConversation';


const startConversation = async (email: string, chatId: number, messages: Message[]) => {
  await addOrFindUser(email);
  await addNewConversation(email, chatId);
  await addMessagesToUserConversation(email, chatId, messages);
}

const addMessagesToConversation = async (email: string, chatId: number, messages: Message[]) => {
  await addMessagesToUserConversation(email, chatId, messages);
}

const endConverstion = async (email: string, chatId: number, messages: Message[], timeDutation: number) => {
  await addMessagesToUserConversation(email, chatId, messages);
  await addTimeDutationToConversation(email, chatId, timeDutation);
}

const getstatics = async (email) => {
  return await countMessagesAndAvgTime(email);
}

export {
  startConversation,
  addMessagesToConversation,
  endConverstion,
  getstatics,
}