"use client";

import { ProductInput } from "@/types/product.schema";

type Props = {
  product: ProductInput;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function ProductInfoBlock({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div className="px-4 py-4 space-y-3 bg-white">
      {/* <div className="grid grid-cols-[1fr_240px] gap-6 items-start"> */}
      {/* Left */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{product.name.ua}</h1>

          <button onClick={onToggleFavorite} className="text-2xl">
            {isFavorite ? "⭐" : "☆"}
          </button>
        </div>
        {/* <p className="text-gray-600">{recipe.description}</p> */}
      </div>
      {/* </div> */}
    </div>
  );
}
