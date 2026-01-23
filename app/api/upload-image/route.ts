import { uploadImageToGCS } from "@/lib/storage.helpers";
import { getSignedReadUrl } from "@/lib/storage.signed-url";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { success: false, error: "File is required" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `products/${crypto.randomUUID()}-${file.name}`;

    const gcsFile = await uploadImageToGCS(
      buffer,
      fileName,
      file.type || "image/jpeg",
    );

    const signedUrl = await getSignedReadUrl(gcsFile);

    return Response.json({
      success: true,
      url: signedUrl,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return Response.json(
      { success: false, error: "Unknown error" },
      { status: 500 },
    );
  }
}
