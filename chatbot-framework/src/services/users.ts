import { IUser, User } from '../Schemas/User';

const getUsersEmail = async (): Promise<IUser[]> => {
  return await User.find({}).select('email').exec();
}

const getMessagesByEmail = async (email: string): Promise<IUser[]> => {
  return await User.find({ email }).select('conversations -_id').exec();
}

export {
  getUsersEmail,
  getMessagesByEmail
}