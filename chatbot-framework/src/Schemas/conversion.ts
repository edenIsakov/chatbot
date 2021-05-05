import { Schema } from 'mongoose';
import { Message, messageSchema } from './message';

interface Conversion {
  id: string,
  messages: [Message],
  timeDutation: Number,
}

const conversectionSchema = new Schema({
  id: { type: String, required: true },
  messages: { type: messageSchema },
  timeDutation: { type: Number }
});


export {
  Conversion,
  conversectionSchema
}