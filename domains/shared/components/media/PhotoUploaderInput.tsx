"use client";

import { useState } from "react";

import { ProductPhotoType } from "@/domains/product/constants/product.constants";
import { PRODUCT_PHOTO_TYPE_OPTIONS } from "@/domains/product/constants/product.ui.options";

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
        {PRODUCT_PHOTO_TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
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
          if (file) onUpload(file, type);
        }}
        className="block w-full text-sm"
      />

      {uploading && <p className="text-sm text-gray-500">Завантаження...</p>}
    </div>
  );
}
