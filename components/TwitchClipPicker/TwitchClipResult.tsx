import { FetchResult } from './types';
import { Button, Grid, TableContainer , Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Image from 'next/image';
import moment from 'moment';
import { SpreadsheetImport } from '../SpreadsheetImport';

type Props = {
  clips: FetchResult;
}

export const TwitchClipResult = ({ clips }: Props) => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SpreadsheetImport result={clips} />
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>サムネイル</TableCell>
                <TableCell>タイトル</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>視聴回数</TableCell>
                <TableCell>作成日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { clips.data.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Image
                      src={r.thumbnailUrl}
                      alt={r.thumbnailUrl}
                      loading="lazy"
                      width='240'
                      height='135'
                    />
                  </TableCell>
                  <TableCell>
                    { r.title }
                  </TableCell>
                  <TableCell>
                    { r.url }
                  </TableCell>
                  <TableCell>
                    { r.viewCount }
                  </TableCell>
                  <TableCell>
                    { moment(r.createdAt).format('YYYY/MM/DD HH:mm:ss') }
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}