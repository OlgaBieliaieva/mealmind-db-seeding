"use client";

import { supabase } from "@/shared/lib/supabase/client";

export function usePhotoDelete() {
  async function remove(objectName: string) {
    const { error } = await supabase.storage
      .from("product-photos")
      .remove([objectName]);

    if (error) throw error;
  }

  return { remove };
}
