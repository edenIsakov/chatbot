import { Number, ObjectId, UpdateWriteOpResult } from 'mongoose';
import { Conversation } from '../Schemas/Conversation';
import { Message } from '../Schemas/message';
import { IUser, User } from '../Schemas/User';


const addOrFindUser = async (email: string): Promise<IUser> => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email });
  }
  return user;
}

const addNewConversation = async (email: string, id: number): Promise<UpdateWriteOpResult> => {
  const conversation: Conversation = { id }
  return await User.updateOne({ email },
    { $push: { conversations: conversation } })
}

const addMessagesToUserConversation = async (email: string, conversationId: number, messages: Message[]): Promise<IUser> => {
  const user = await User.findOne({ email });
  const conversetion = user.conversations.find((conv) => conv.id === conversationId);
  if (!conversetion.messages) {
    conversetion.messages = messages;
  } else {
    for (let message of messages) {
      conversetion.messages.push(message);
    }
  }

  return await user.save();
}

const addTimeDutationToConversation = async (email: string, conversationId: number, timeDutation: number): Promise<IUser> => {
  const user = await User.findOne({ email });
  const conversation = user.conversations.find((conv) => conv.id === conversationId);
  conversation.timeDutation = timeDutation;
  return await user.save();
}

const countMessagesAndAvgTime = async (email) => {
  const user = await User.findOne({ email });
  let count = 0;
  let sumTime = 0;
  let endedConvs = 0;
  for (let conv of user.conversations) {
    count += conv.messages ? conv.messages.length : 0;
    if (conv.timeDutation) {
      sumTime += conv.timeDutation;
      endedConvs += 1;
    }
  }
  return { count, avg: (sumTime / endedConvs) };
}



export {
  addOrFindUser,
  addNewConversation,
  addMessagesToUserConversation,
  addTimeDutationToConversation,
  countMessagesAndAvgTime,
}

