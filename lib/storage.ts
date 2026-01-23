import { Storage } from "@google-cloud/storage";
import { env } from "./env";

export const storage = new Storage({
  projectId: env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

export const bucket = storage.bucket(env.GCS_BUCKET_NAME);
