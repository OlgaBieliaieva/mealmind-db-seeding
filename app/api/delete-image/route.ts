import { getBucket } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const { objectName } = await req.json();

    if (!objectName || typeof objectName !== "string") {
      return Response.json(
        { success: false, error: "objectName is required" },
        { status: 400 },
      );
    }

    const bucket = getBucket();
    await bucket.file(objectName).delete();

    return Response.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete image failed:", error);

    return Response.json(
      { success: false, error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
