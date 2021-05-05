import { Conversation } from '../Schemas/conversation';
import { Message } from '../Schemas/message';
import { addOrFindUser, addNewConversation, addMessagesToUserConversation, addTimeDutationToConversation } from '../services/userConversation';


const startConversation = async (email: string, chatId: number, messages: Message[]) => {
  try {
    await addOrFindUser(email);
    await addNewConversation(email, chatId);
    await addMessagesToUserConversation(email, chatId, messages);
  } catch (error) {
    console.log('Faild to add conversation', error);
  }
}

const addMessagesToConversation = async (email: string, chatId: number, messages: Message[]) => {
  try {
    await addMessagesToUserConversation(email, chatId, messages);
  } catch (error) {
    console.log('Faild to add message', error);
  }
}

const endConverstion = async (email: string, chatId: number, messages: Message[], timeDutation: number) => {
  try {
    await addMessagesToUserConversation(email, chatId, messages);
    await addTimeDutationToConversation(email, chatId, timeDutation);
  } catch (error) {
    console.log('Faild to end conversation', error);
  }
}

export {
  startConversation,
  addMessagesToConversation,
  endConverstion
}