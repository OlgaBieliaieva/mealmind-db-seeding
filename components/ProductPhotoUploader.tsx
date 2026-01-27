"use client";

import { useState } from "react";
import Image from "next/image";
import { UseFormSetValue } from "react-hook-form";
import { ProductFormValues } from "@/types/product-form.schema";

const PHOTO_TYPES = [
  { value: "packaging", label: "Packaging" },
  { value: "ingredients", label: "Ingredients" },
  { value: "other", label: "Other" },
] as const;

type Props = {
  photos?: ProductFormValues["photos"];
  setValue: UseFormSetValue<ProductFormValues>;
};

export function ProductPhotoUploader({ photos = [], setValue }: Props) {
  const [uploading, setUploading] = useState(false);
  const [photoType, setPhotoType] =
    useState<(typeof PHOTO_TYPES)[number]["value"]>("packaging");

  const onFileChange = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      const next = [
        ...(photos ?? []),
        {
          type: photoType,
          url: data.url,
          objectName: data.objectName,
        },
      ];

      setValue("photos", next, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Photos</label>

      <select
        value={photoType}
        onChange={(e) => setPhotoType(e.target.value as typeof photoType)}
        className="rounded border px-2 py-1 text-sm"
      >
        {PHOTO_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileChange(file);
        }}
        className="block text-sm"
      />

      {uploading && <p className="text-sm text-gray-500">Uploading…</p>}

      {photos?.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((p, i) => (
            <div key={i} className="relative">
              <Image
                key={i}
                src={p.url}
                alt={p.type}
                width={96}
                height={96}
                className="h-24 w-full rounded object-cover"
              />
              <button
                type="button"
                onClick={async () => {
                  const photo = photos[i];

                  await fetch("/api/delete-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ objectName: photo.objectName }),
                  });

                  const next = photos.filter((_, index) => index !== i);
                  setValue("photos", next, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                className="absolute right-1 top-1 rounded bg-black/60 px-1 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
