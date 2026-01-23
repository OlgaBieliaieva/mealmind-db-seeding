import { bucket } from "@/lib/storage";

export async function uploadImageToGCS(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
) {
  const file = bucket.file(fileName);

  await file.save(fileBuffer, {
    contentType,
    resumable: false,
  });

  return file;
}
