import sharp from "sharp"
import { getSupabaseAdmin } from "../../infra/supabase/supabase.admin";

const VARIANTS = [
  { folder: "thumb", width: 80, quality: 60 },
  { folder: "list", width: 160, quality: 70 },
  { folder: "card", width: 320, quality: 75 },
  { folder: "detail", width: 720, quality: 82 },
];

export async function generateProductPhotoVariants(
  productId: string,
  objectName: string,
) {
  const supabaseAdmin = getSupabaseAdmin();

  const { data } = await supabaseAdmin.storage
    .from("product-photos")
    .download(objectName);

  if (!data) return;

  const buffer = Buffer.from(await data.arrayBuffer());
  const filename = objectName.split("/").pop();

  for (const variant of VARIANTS) {
    const resized = await sharp(buffer)
      .rotate()
      .resize({ width: variant.width, withoutEnlargement: true })
      .jpeg({ quality: variant.quality ?? 75, mozjpeg: true })
      .toBuffer();

    await supabaseAdmin.storage
      .from("product-photos")
      .upload(`products/${productId}/${variant.folder}/${filename}`, resized, {
        contentType: "image/jpeg",
        upsert: true,
      });
  }
}
