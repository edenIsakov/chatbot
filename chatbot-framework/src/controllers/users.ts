import { IUser } from '../Schemas/User';
import { getUsersEmail, getMessagesByEmail } from '../services/users';
import { flatMessagesConversations } from '../utils';


const getUsers = async (req, res, next) => {
  try {
    const result: IUser[] = await getUsersEmail();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Error trying get users details');
  }
}

const getUserMessages = async (req, res, next) => {
  try {
    const { email } = req.params;
    const result: IUser[] = await getMessagesByEmail(email);
    const conversations = result[0].conversations;
    res.status(200).send(flatMessagesConversations(conversations));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error trying get user conversations');
  }
}

export {
  getUsers,
  getUserMessages
}