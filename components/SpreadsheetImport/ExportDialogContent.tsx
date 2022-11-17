import { Button, DialogContentText, TextField } from '@mui/material'
import { Stack } from '@mui/system';
import moment from 'moment';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google'
import { confirmSpreadsheetExists, fetchSpreadsheetIdFromUrl, Value, writeDataTable } from './spreadsheet';
import { Clip } from '../../libs/twitch/types';

type Props = {
  clips: Clip[],
}

const makeValues = (clips: Clip[]): Value[][] => {
  const column = [
    'サムネイル',
    'タイトル',
    'URL',
    '視聴回数',
    '作成日時',
  ];

  const rows = clips.map(clip => ([
    `=IMAGE("${clip.thumbnailUrl}")`,
    clip.title,
    clip.url,
    clip.viewCount,
    moment(clip.createdAt).format('YYYY/MM/DD HH:mm:ss'),
  ]));

  return [
    column,
    ... rows,
  ];
}

export const ExportDialogContent = ({ clips }: Props) => {

  const [ url, setUrl ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleExport = () => {
    try {
      setIsLoading(true);
      googleLogin();
    } catch(e) {
      console.error(e);
    }
  }

  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    overrideScope: true,
    onSuccess: async (response) => {
      const accessToken = response.access_token;
      const spreadsheetId = fetchSpreadsheetIdFromUrl(url);
      try {
        await confirmSpreadsheetExists(accessToken, spreadsheetId);
        await writeDataTable(accessToken, spreadsheetId, makeValues(clips))
        alert('指定されたスプレッドシートに出力しました！');
      } catch (e) {
        console.error(e);
        alert('失敗しました. コンソールを確認してください.');
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <Stack spacing={1}>
      <DialogContentText>
        Google スプレッドシートのURLを指定して、クリップ情報を出力します
      </DialogContentText>
      <TextField
        label='Google Spreadsheet URL'
        type='url'
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.currentTarget.value)}
      />
      <Button
        variant='contained'
        onClick={handleExport}
        disabled={!url || isLoading}
      >
        { isLoading ? '出力中です...' : '実行'}
      </Button>
    </Stack>
  )
}