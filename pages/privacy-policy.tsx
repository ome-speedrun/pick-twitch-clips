import { Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

export default function Home() {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant='h3'>
          プライバシーポリシー - Twitch Clips Picker
        </Typography>
        <Typography variant='h4'>
          個人情報の取得方法
        </Typography>
        <Typography variant='body1'>
          本サイトでは、Google の提供するユーザー認証方式によって、ユーザーが所有する Google Spreadsheet への読み込み・書き込みを可能にする認証トークン（以下アクセストークン）を取得します。
        </Typography>
        <Typography variant='h4'>
          個人情報の利用目的
        </Typography>
        <Typography variant='body1'>
          取得したアクセストークンは、ユーザーがアクセス権を保持し、ユーザーが本サイト上でURLを送信した Google Spreadsheet への書き込みを目的に使用し、それ以外の用途には使用いたしません。
          また、取得したアクセストークンについては、ブラウザ上で実行される JavaScript 上でのみ使用し、本サイトを提供するいかなるサーバーにも送信されることはありません。
        </Typography>
        <Typography variant='h4'>
          免責事項
        </Typography>
        <Typography variant='body1'>
          本サイトの利用を目的とした Google アカウントへのログイン等で発生したいかなる問題について、本サイトでは一切の責任を負いません。
        </Typography>
      </Stack>
    </Container>
  )
}
