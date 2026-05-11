"use client";

import { useRouter } from "next/navigation";
import { usePlanParams } from "@/features/meal-plan/hooks/usePlanParams";

type Props = {
  open: boolean;
  onClose: () => void;
  productId?: string;
  recipeId?: string;
};

export function FoodActionSheet({ open, onClose, productId, recipeId }: Props) {
  const router = useRouter();
  const { activeDate } = usePlanParams();

  if (!open) return null;

  function handleAddToPlan() {
    const params = new URLSearchParams();

    params.set("date", activeDate);

    if (recipeId) {
      params.set("recipeId", recipeId);
    }

    if (productId) {
      params.set("productId", productId);
    }

    onClose();

    router.push(`/plan/add/advanced?${params.toString()}`);
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleAddToPlan}
          className="w-full text-left p-3 rounded-xl hover:bg-gray-100"
        >
          🍽 Додати в план
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">
          🍽 Додати в щоденник
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
