"use client";

import { useState } from "react";
import { ProductPhotoType } from "../../domain/constants/product.constants";

const OPTIONS: { value: ProductPhotoType; label: string }[] = [
  { value: "packaging", label: "Packaging" },
  { value: "ingredients", label: "Ingredients" },
  { value: "other", label: "Other" },
];

type Props = {
  uploading: boolean;
  onUpload: (file: File, type: ProductPhotoType) => void;
};

export function Uploader({ uploading, onUpload }: Props) {
  const [type, setType] = useState<ProductPhotoType>("packaging");

  return (
    <div className="space-y-3">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as ProductPhotoType)}
        className="w-full rounded border px-3 py-2 text-sm"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file, type);
        }}
      />

      {uploading && <p className="text-sm">Завантаження...</p>}
    </div>
  );
}
