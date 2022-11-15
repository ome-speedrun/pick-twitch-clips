import axios from 'axios';

const SPREADSHEET_API = 'https://sheets.googleapis.com/v4/spreadsheets/';

const endpointFor = (spreadsheetId: string): string => {
  return `${SPREADSHEET_API}${spreadsheetId}`;
}

export const fetchSpreadsheetIdFromUrl = (url: string): string => {
  const spreadsheetUrl = new URL(url);
  const [_empty, _spreadsheets, _d, spreadsheetId, ] = spreadsheetUrl.pathname.split('/');

  if (!spreadsheetId) {
    throw new Error('Failed to get Spreadsheet ID');
  }

  return spreadsheetId;
} 

export const confirmSpreadsheetExists = async (accessToken: string, spreadsheetId: string): Promise<boolean> => {

  const ss = await axios.get(endpointFor(spreadsheetId),{
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  return ss.status < 300;
}

export type Value = string|number;

type AddSheetResponse = {
  addSheet: {
    properties: {
      sheetId: number,
      title: string,
    },
  },
};

export const writeDataTable = async (accessToken: string, spreadsheetId: string, data: Value[][]): Promise<void> => {
  const now = new Date();
  const sheetName = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`

  const addSheetResponse = await axios.post<{replies: AddSheetResponse[]}>(
    `${endpointFor(spreadsheetId)}:batchUpdate`,
    {
      requests: [
        {
          addSheet: {
            properties: {
              title: sheetName,
            }
          }
        }
      ]
    },{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    },
  );

  const { sheetId, title } = addSheetResponse.data.replies[0].addSheet.properties;

  await axios.post(`${endpointFor(spreadsheetId)}/values/${title}!A1:E1:append?valueInputOption=USER_ENTERED`, {
    range: `${title}!A1:E1`,
    majorDimension: 'ROWS',
    values: data,
  },{
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  // resize
  await axios.post(`${endpointFor(spreadsheetId)}:batchUpdate`, {
    requests: [
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: sheetId,
            dimension: 'COLUMNS',
            startIndex: 0,
            endIndex: data[0].length,
          }
        }
      },
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: sheetId,
            dimension: 'ROWS',
            startIndex: 0,
            endIndex: data.length,
          }
        }
      },
    ]
  },{
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })
}