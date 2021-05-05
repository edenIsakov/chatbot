import { ObjectId, UpdateWriteOpResult } from 'mongoose';
import { Conversion } from '../interfaces/conversionDetails';
import { Message } from '../Schemas/message';
import { IUser, User } from '../Schemas/User';


const findUser = async (email: string): Promise<IUser> => {
  return await User.findOne({ email });
}

const addUser = async (email: string): Promise<IUser> => {
  return await User.create({ email });
}

const addNewConversation = async (id: ObjectId, conversection: Conversion): Promise<UpdateWriteOpResult> => {
  return await User.updateOne({ _id: id },
    { $push: { conversections: conversection } })
}

const addMessagesToUserConversation = async (email: string, conversectionId: string, message: Message): Promise<IUser> => {
  const user = await User.findOne({ email });
  const conversetion = user.conversections.find((conv) => conv.id === conversectionId);
  conversetion.messages.push(message);
  return await user.save();
}

const addTimeDutationToConversation = async (email: string, conversectionId: string, timeDutation: Number): Promise<IUser> => {
  const user = await User.findOne({ email });
  const conversetion = user.conversections.find((conv) => conv.id === conversectionId);
  conversetion.timeDutation = timeDutation;
  return await user.save();
}
export {
  findUser,
  addUser,
  addNewConversation,
  addMessagesToUserConversation,
}

