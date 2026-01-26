import { google } from "googleapis";
import { getEnv } from "./env";

export function getSheetsClient() {
  const env = getEnv();

  const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({
      version: "v4",
      auth,
    }),
    spreadsheetId: env.GOOGLE_SHEETS_ID,
  };
}
