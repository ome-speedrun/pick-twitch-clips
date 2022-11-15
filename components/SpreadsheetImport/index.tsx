import { FetchResult } from '../TwitchClipPicker/types'
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react';
import { ExportDialogContent } from './ExportDialogContent';
import { GoogleOAuthProvider } from '@react-oauth/google';

type Props = {
  result: FetchResult;
}

export const SpreadsheetImport = ({ result }: Props) => {

  const [ open, setOpen ] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpen(true);
  }

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
        <Button
          variant='outlined'
          color='info'
          fullWidth
          onClick={handleOpenDialog}
        >Google Spreadsheet に出力</Button>
        <Dialog open={open} onClose={() => {setOpen(false)}}>
          <DialogTitle>Google Spreadsheet に出力する</DialogTitle>
          <DialogContent>
            <ExportDialogContent {...result} clips={result.data} />
          </DialogContent>
        </Dialog>
      </GoogleOAuthProvider>
    </>
  )
}