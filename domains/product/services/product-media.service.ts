import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { TempProductPhoto } from "../types/product-photo.types";

export async function finalizeProductPhotos(
  productId: string,
  photos: TempProductPhoto[],
): Promise<TempProductPhoto[]> {
  const finalized: TempProductPhoto[] = [];
  const supabaseAdmin = getSupabaseAdmin();
  for (const photo of photos) {
    const filename = photo.objectName.split("/").pop();

    const newObjectName = `products/${productId}/${filename}`;

    const { error: copyError } = await supabaseAdmin.storage
      .from("product-photos")
      .copy(photo.objectName, newObjectName);

    if (copyError) {
      throw new Error(copyError.message);
    }

    await supabaseAdmin.storage
      .from("product-photos")
      .remove([photo.objectName]);

    const { data } = supabaseAdmin.storage
      .from("product-photos")
      .getPublicUrl(newObjectName);

    finalized.push({
      type: photo.type,
      objectName: newObjectName,
      url: data.publicUrl,
    });
  }

  return finalized;
}
