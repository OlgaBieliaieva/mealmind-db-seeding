import { z } from "zod";

const envSchema = z.object({
  GOOGLE_PROJECT_ID: z.string(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string(),
  GOOGLE_SHEETS_ID: z.string(),
  GCS_BUCKET_NAME: z.string(),
  ADMIN_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success && process.env.NODE_ENV === "production") {
  throw new Error("Invalid environment variables");
}

export const env = parsed.success
  ? parsed.data
  : ({} as z.infer<typeof envSchema>);
