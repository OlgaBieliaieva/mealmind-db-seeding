import { z } from "zod";

const envSchema = z.object({
  GOOGLE_PROJECT_ID: z.string(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string(),
  GOOGLE_SHEETS_ID: z.string(),
  GCS_BUCKET_NAME: z.string(),
  ADMIN_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
