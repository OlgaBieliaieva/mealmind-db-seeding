"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
};

export function AvatarUploader({ value, onChange }: Props) {
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
      onChange(data.url);
    }

    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-600">Аватар автора</label>

      {value ? (
        <div className="relative w-24">
          <Image
            src={value}
            alt="Author avatar"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />

          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-1 -top-1 rounded-full bg-black px-1 text-xs text-white"
          >
            ✕
          </button>
        </div>
      ) : (
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
      )}

      {uploading && <p className="text-sm text-gray-500">Uploading…</p>}
    </div>
  );
}
