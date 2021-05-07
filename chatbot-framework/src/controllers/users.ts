import { IUser } from '../Schemas/User';
import { getUsersEmail, getConversationsByEmail } from '../services/users';


const getUsers = async (req, res, next) => {
  try {
    const result: IUser[] = await getUsersEmail();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Error trying get users details');
  }
}

const getUserConversations = async (req, res, next) => {
  try {
    const { email } = req.params;
    const result: IUser[] = await getConversationsByEmail(email);
    let conversations = result[0].conversations;
    res.status(200).send(conversations);
  } catch (error) {
    res.status(500).send('Error trying get user conversations');
  }
}

export {
  getUsers,
  getUserConversations
}