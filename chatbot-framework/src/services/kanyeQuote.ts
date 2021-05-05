import config from 'config';
import axios, { AxiosResponse } from 'axios';

interface Kanye {
  quote: string;
}

const getquote = async (): Promise<string> => {
  const kanyeUrl: string = config.get('kanyeUrl');
  const { data }: AxiosResponse<Kanye> = await axios.get<Kanye>(kanyeUrl);
  return data.quote;
};

export { getquote };
