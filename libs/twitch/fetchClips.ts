import { ApiClient } from '@twurple/api/lib';
import moment from 'moment';
import { Clip, Page } from './types';
import { HelixClip } from '@twurple/api'

export const fetchClips = async (
  client: ApiClient,
  channel: string,
  startDate: moment.Moment,
  endDate: moment.Moment,
): Promise<Clip[]> => {

  const user = await client.users.getUserByName(channel);

  if (!user) {
    return [];
  }

  // Prevent too large response
  const startOneYearLater = startDate.clone().add(1, 'year');
  const endDateFixed = moment.min(startOneYearLater, endDate);

  const paginator = client.clips.getClipsForBroadcasterPaginated(user.id, {
    startDate: startDate.toISOString(),
    endDate: endDateFixed.toISOString(),
  });

  let index = 0;
  let clips: HelixClip[] = [];
  while(true) {
    index++;
    clips.push(...await paginator.getNext())

    if (index >= 10) {
      break;
    }
  }

  return clips.map(clip => ({
    id: clip.id,
    title: clip.title,
    viewCount: clip.views,
    url: clip.url,
    thumbnailUrl: clip.thumbnailUrl,
    createdAt: moment(clip.creationDate),
  }));
}