import moment from "moment";

interface Details {
  email: string,
  startTime: moment.Moment,
}

export interface ConvercetionDetails {
  [key: string]: Details;

}
