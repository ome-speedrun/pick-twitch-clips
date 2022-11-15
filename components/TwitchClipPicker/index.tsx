import { useState } from 'react'
import { TwitchClipFetcher } from './TwitchClipFetcher'
import { TwitchClipResult } from './TwitchClipResult';
import { FetchResult } from './types';

export const TwitchClipPicker = () => {

  const [ clips, setClips ] = useState<FetchResult|null>(null);

  return (
    <>
      <TwitchClipFetcher onFetch={setClips} />
      {
        clips && (
          <TwitchClipResult clips={clips} />
        )
      }
    </>
  )
}