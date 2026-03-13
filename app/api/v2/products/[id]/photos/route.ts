import { NextRequest } from "next/server";
import { attachProductPhotos } from "@/domains/product/services/product.service";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await req.json();

  await attachProductPhotos(id, body.photos);

  return Response.json({ success: true });
}
