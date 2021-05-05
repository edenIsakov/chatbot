import { model, Schema, Model, Document } from 'mongoose';
import { conversectionSchema, Conversion } from './conversion';

interface IUser extends Document {
  email: string,
  conversections: [Conversion],
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  conversections: [conversectionSchema]
});

const User: Model<IUser> = model('User', UserSchema);

export {
  IUser,
  User,
}