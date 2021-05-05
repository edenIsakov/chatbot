import { model, Schema, Model, Document } from 'mongoose';
import { conversationSchema, Conversation } from './conversation';

interface IUser extends Document {
  email: string,
  conversations: [Conversation],
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  conversations: [conversationSchema]
});

const User: Model<IUser> = model('UserConversations', UserSchema);

export {
  IUser,
  User,
}