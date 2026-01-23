import { File } from "@google-cloud/storage";

export async function getSignedReadUrl(file: File) {
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 днів
  });

  return url;
}
