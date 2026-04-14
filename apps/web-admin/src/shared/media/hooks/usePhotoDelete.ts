"use client";

import { supabase } from "@/shared/lib/supabase/client";

export function usePhotoDelete(bucket: string) {
  async function remove(objectName: string) {
    const { error } = await supabase.storage.from(bucket).remove([objectName]);

    if (error) throw error;
  }

  return { remove };
}

// "use client";

// import { supabase } from "@/shared/lib/supabase/client";

// export function usePhotoDelete() {
//   async function remove(objectName: string) {
//     const { error } = await supabase.storage
//       .from("product-photos")
//       .remove([objectName]);

//     if (error) throw error;
//   }

//   return { remove };
// }
