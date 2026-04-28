"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddMealType, AddUser } from "../types/add-meal-plan.types";

type Props = {
  users: AddUser[];
  mealTypes: AddMealType[];

  selectedUserId: string | null;
  selectedMealTypeId: string | null;

  date: string;
  selectedCount: number;
  canConfirm: boolean;

  onUserClick: () => void;
  onMealTypeClick: () => void;
  onConfirm: () => void;
};

export function AddEntryHeader({
  users,
  mealTypes,
  selectedUserId,
  selectedMealTypeId,
  date,
  selectedCount,
  canConfirm,
  onUserClick,
  onMealTypeClick,
  onConfirm,
}: Props) {
  const router = useRouter();

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const selectedMeal = mealTypes.find((m) => m.id === selectedMealTypeId);

  return (
    <div className="sticky top-0 z-20 border-b border-stone-200/80 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-50 active:scale-95"
        >
          <X size={20} />
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="flex gap-1.5 items-center">
            <span className="text-sm font-semibold tracking-tight text-stone-900">
              Додати до плану
            </span>
            <span className="text-sm font-medium uppercase text-stone-400">
              {date}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onUserClick}
              className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-stone-50 px-1 py-0.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-stone-300 hover:bg-white active:scale-[0.98]"
            >
              <span className="flex h-6 items-center justify-center border-r border-stone-200 px-1.5 text-sm">
                👤
              </span>
              <span className="px-1.5 text-sm font-medium text-stone-700">
                {selectedUser ? selectedUser.name : "Не обрано"}
              </span>
            </button>

            <button
              type="button"
              onClick={onMealTypeClick}
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-1 py-0.5 text-sm font-medium text-emerald-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-100 active:scale-[0.98]"
            >
              <span className="flex h-6 items-center justify-center border-r border-emerald-200 px-1.5 text-sm">
                🍳
              </span>
              <span className="px-1.5 text-sm font-medium text-emerald-800">
                {selectedMeal ? selectedMeal.name : "Не обрано"}
              </span>
            </button>
          </div>
        </div>

        {selectedCount > 0 && (
          <button
            type="button"
            disabled={!canConfirm}
            onClick={onConfirm}
            className="ml-auto mt-0.5 inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(5,150,105,0.9)] transition hover:bg-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span className="rounded-full bg-white/20 px-1 py-0.5 text-xs font-bold">
              {selectedCount}
            </span>
            <span>✓</span>
          </button>
        )}
      </div>
    </div>
  );
}
