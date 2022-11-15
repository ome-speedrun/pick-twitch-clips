import moment from 'moment';
import { Clip } from '../../libs/twitch/types';

export type FetchResult = {
  from: moment.Moment;
  to: moment.Moment;
  count: number;
  data: Clip[];
}