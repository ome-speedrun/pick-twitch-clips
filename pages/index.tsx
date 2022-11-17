import { TwitchClipPicker } from '../components/TwitchClipPicker'
import { Container, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Link from 'next/link';

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container>
        <Stack spacing={2}>
          <Typography variant='h2'>
          Twitch Clips Picker
          </Typography>
          <TwitchClipPicker />
          <Divider />
          <Typography variant='body2'>
            <Link href='/privacy-policy'>
              プライバシーポリシー
            </Link>
          </Typography>
        </Stack>
      </Container>
    </LocalizationProvider>
  )
}
