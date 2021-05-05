import { Schema } from 'mongoose';
import { Message, messageSchema } from './message';

interface Conversation {
  id: number,
  messages?: Message[],
  timeDutation?: number,
}

const conversationSchema = new Schema({
  id: { type: Number, required: true },
  messages: { type: [messageSchema] },
  timeDutation: { type: Number }
});


export {
  Conversation,
  conversationSchema
}