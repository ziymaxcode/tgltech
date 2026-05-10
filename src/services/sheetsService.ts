import { google } from "googleapis";

export async function getSheetsClient() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  
  if (privateKey && clientEmail) {
    // Authenticate with service account (Allows read/write to private sheets shared with service account email)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  } else if (apiKey) {
    // Authenticate with API key (Only allows reading public sheets)
    return google.sheets({ version: "v4", auth: apiKey });
  } else {
    throw new Error("Missing Google Sheets credentials. Please set GOOGLE_API_KEY, or GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in your environment variables.");
  }
}

export function getSheetId() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID environment variable.");
  }
  return spreadsheetId;
}

export async function getSheetData(range: string) {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSheetId();
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    return [];
  }

  const headers = rows[0];
  const data = rows.slice(1).map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((header: string, index: number) => {
      // Parse arrays if they are comma separated strings for specific fields, or keep as string
      // Let's keep it simple first: just string mapping, but for arrays like "relatedCourses", we can do it in the API later
      let value = row[index] || "";
      obj[header] = value;
    });
    return obj;
  });

  return data;
}
