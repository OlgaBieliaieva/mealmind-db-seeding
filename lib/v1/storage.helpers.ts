import { getBucket } from "@/lib/v1/storage";

export async function uploadImageToGCS(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
) {
  const bucket = getBucket();
  const file = bucket.file(fileName);

  await file.save(fileBuffer, {
    contentType,
    resumable: false,
  });

  return file;
}
