import { Moment } from 'moment';

interface Details {
  email: string,
  startTime: Moment,
}

interface ConversionDict {
  [key: string]: Details,

}

export {
  ConversionDict,
}