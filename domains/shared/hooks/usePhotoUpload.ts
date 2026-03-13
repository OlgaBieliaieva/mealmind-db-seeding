"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { generateUUID } from "@/domains/shared/utils/uuid";

export function usePhotoUpload() {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);

    try {
      const ext = file.name.includes(".")
        ? file.name.split(".").pop()
        : (file.type.split("/")[1] ?? "jpg");

      const objectName = `products/temp/${generateUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("product-photos")
        .upload(objectName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("product-photos")
        .getPublicUrl(objectName);

      return {
        url: data.publicUrl,
        objectName,
      };
    } finally {
      setUploading(false);
    }
  }

  return {
    upload,
    uploading,
  };
}
