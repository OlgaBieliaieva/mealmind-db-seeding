"use client";

import Image from "next/image";

type Props = {
  photo: {
    url: string;
    type: string;
  };
  onRemove: () => void;
};

export function PhotoCard({ photo, onRemove }: Props) {
  return (
    <div className="relative">
      <Image
        src={photo.url}
        alt={photo.type}
        width={160}
        height={160}
        className="h-32 w-full rounded object-cover"
      />

      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 rounded bg-black/60 px-2 py-1 text-xs text-white"
      >
        ✕
      </button>
    </div>
  );
}
