import { Schema } from 'mongoose';

enum Sender {
  User = 'user',
  Bot = 'bot',
}

interface Message {
  text: string,
  sender: Sender,
}

const messageSchema = new Schema({
  text: { type: String, required: true },
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true,
  }
});


export { Message, messageSchema, Sender }