"use client";

import { useState } from "react";
import Image from "next/image";

type RecipePhoto = {
  url: string;
  objectName: string;
};

type Props = {
  photos?: RecipePhoto[];
  onChange: (photos: RecipePhoto[]) => void;
  onCoverChange?: (url: string) => void;
};

export function RecipePhotoUploader({
  photos = [],
  onChange,
  onCoverChange,
}: Props) {
  const [uploading, setUploading] = useState(false);

  async function onFileChange(file: File) {
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
        ...photos,
        {
          url: data.url,
          objectName: data.objectName,
        },
      ];

      onChange(next);

      // ✅ перше фото → cover
      if (photos.length === 0 && onCoverChange) {
        onCoverChange(data.url);
      }
    }

    setUploading(false);
  }

  async function removePhoto(index: number) {
    const photo = photos[index];

    await fetch("/api/delete-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objectName: photo.objectName }),
    });

    const next = photos.filter((_, i) => i !== index);
    onChange(next);

    // якщо видалили cover — скидаємо
    if (index === 0 && onCoverChange) {
      onCoverChange(next[0]?.url ?? "");
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Фото страви</label>

      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileChange(file);
        }}
        className="block text-sm"
      />

      {uploading && <p className="text-sm text-gray-500">Завантаження…</p>}

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((p, i) => (
            <div key={p.objectName} className="relative">
              <Image
                src={p.url}
                alt="recipe photo"
                width={96}
                height={96}
                className="h-24 w-full rounded object-cover"
              />

              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-black/70 px-1 text-xs text-white">
                  cover
                </span>
              )}

              <button
                type="button"
                onClick={() => removePhoto(i)}
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
