import { Moment } from 'moment';

interface Details {
  email: string,
  startTime: Moment,
}

interface ConversationDict {
  [key: string]: Details,

}

export {
  ConversationDict,
}