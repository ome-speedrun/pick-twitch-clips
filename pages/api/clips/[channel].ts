import { NextApiRequest, NextApiResponse } from 'next';
import { authProvider } from '../../../libs/twitch/authentication';
import { Clip } from '../../../libs/twitch/types';
import { ApiClient } from '@twurple/api';
import { fetchClips } from '../../../libs/twitch/fetchClips';
import moment from 'moment';

const getClipsHandler = async (req: NextApiRequest, res: NextApiResponse<Clip[] | void>) => {

  if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
    throw new Error('Twitch api environments is invalid.')
  }

  const { channel, from, to } = req.query;

  if (
    !channel || typeof channel !== 'string'
    || !from || typeof from !== 'string'
    || !to || typeof to !== 'string'
  ) {
    return res.status(400).send();
  }
  
  const provider = authProvider(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET);
  const twitch = new ApiClient({ authProvider: provider });

  try {
    const clips = await fetchClips(twitch, channel, moment(from), moment(to));
    return res.json(clips);
  } catch (e) {
    throw e;
  }
}

export default getClipsHandler;