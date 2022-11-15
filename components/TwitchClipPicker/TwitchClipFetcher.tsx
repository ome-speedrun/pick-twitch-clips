import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { useState } from 'react'
import { Clip, Page } from '../../libs/twitch/types'
import axios from 'axios'
import { FetchResult } from './types'

const fetchClips = async (
  channel: string,
  from: moment.Moment,
  to: moment.Moment,
): Promise<Clip[]> => {
  const response = await axios.get<Clip[]>(`/api/clips/${channel}`, {
    params: {
      from: from.toISOString(),
      to: to.toISOString(),
    }
  });

  return response.data;
}

type Props = {
  onFetch: (result: FetchResult) => void;
}

export const TwitchClipFetcher = ({ onFetch }: Props) => {

  const [ channel, setChannel ] = useState<string>('');
  const [ from, setFrom ] = useState<moment.Moment|null>(null);
  const [ to, setTo ] = useState<moment.Moment|null>(null);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleFetch = async () => {
    setIsLoading(true);
    if (!from || !to) {
      console.error('From or To datetime is not set.');
      return;
    }

    const clips = await fetchClips(channel, from, to);
    onFetch({
      from,
      to,
      count: clips.length,
      data: clips,
    })

    setIsLoading(false);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Twitchチャンネル'
          value={channel}
          onChange={(e) => setChannel(e.currentTarget.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">twitch.tv/</InputAdornment>,
          }}
          disabled={isLoading}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DateTimePicker
          label="取得開始日時"
          value={from}
          onChange={setFrom}
          renderInput={(params) => <TextField fullWidth {...params} />}
          inputFormat='YYYY/MM/DD HH:mm:ss'
          InputProps={{
            fullWidth: true,
          }}
          disabled={isLoading}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DateTimePicker
          label="取得終了日時"
          value={to}
          onChange={setTo}
          renderInput={(params) => <TextField fullWidth {...params} />}
          inputFormat='YYYY/MM/DD HH:mm:ss'
          InputProps={{
            fullWidth: true,
          }}
          disabled={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='outlined'
          fullWidth
          onClick={handleFetch}
          disabled={isLoading}
        >
          クリップ取得
        </Button>
      </Grid>
    </Grid>
  )
}