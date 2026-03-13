"use client";

import { supabase } from "@/lib/supabase/client";
import { TempProductPhoto } from "../types";

export function usePhotoLifecycle() {
  async function finalizePhotos(
    photos: TempProductPhoto[],
    productId: string,
  ): Promise<TempProductPhoto[]> {
    if (!photos.length) return photos;

    const bucket = supabase.storage.from("product-photos");

    const finalized: TempProductPhoto[] = [];

    for (const photo of photos) {
      const fileName = photo.objectName.split("/").pop();

      const newPath = `products/${productId}/${fileName}`;

      // ⭐ move
      const { error } = await bucket.move(photo.objectName, newPath);

      if (error) {
        console.error("Photo move failed", error);
        continue;
      }

      const { data } = bucket.getPublicUrl(newPath);

      finalized.push({
        ...photo,
        objectName: newPath,
        url: data.publicUrl,
      });
    }

    return finalized;
  }

  return {
    finalizePhotos,
  };
}
