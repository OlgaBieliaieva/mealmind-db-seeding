import { z } from "zod";

const envSchema = z.object({
  GOOGLE_PROJECT_ID: z.string(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string(),
  GOOGLE_SHEETS_ID: z.string(),
  GCS_BUCKET_NAME: z.string(),
  ADMIN_SECRET: z.string(),
});

let cachedEnv: z.infer<typeof envSchema> | null = null;

/**
 * Reads and validates environment variables.
 * IMPORTANT:
 * - Called ONLY at runtime (inside API handlers)
 * - Never during build
 */
export function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error("Invalid environment variables");
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
