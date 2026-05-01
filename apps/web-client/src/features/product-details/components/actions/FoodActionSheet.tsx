"use client";

import { ProductDetailsDTO } from "../../types/product-details.types";

type Props = {
  open: boolean;
  onClose: () => void;
  product?: ProductDetailsDTO;
};

export function FoodActionSheet({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">
          🍽 Додати в план
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">
          🛒 Додати в покупки
        </button>

        <button
          onClick={onClose}
          className="w-full text-center p-3 text-gray-500"
        >
          Скасувати
        </button>
      </div>
    </div>
  );
}
