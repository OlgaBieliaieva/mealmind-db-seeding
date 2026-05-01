"use client";

import Image from "next/image";
import { ProductDetailsDTO } from "../../types/product-details.types";

export function ProductHero({ product }: { product: ProductDetailsDTO }) {
  return (
    <div className="relative w-full h-64">
      {product.photoUrl ? (
        <Image
          src={product.photoUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-4xl bg-gray-100">
          🥑
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
    </div>
  );
}
