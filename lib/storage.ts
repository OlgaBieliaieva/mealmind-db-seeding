import { Storage } from "@google-cloud/storage";
import { getEnv } from "@/lib/env";

export function getBucket() {
  const env = getEnv();

  const storage = new Storage({
    projectId: env.GOOGLE_PROJECT_ID,
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
  });

  return storage.bucket(env.GCS_BUCKET_NAME);
}
