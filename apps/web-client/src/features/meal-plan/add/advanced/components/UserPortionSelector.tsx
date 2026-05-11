"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useState } from "react";
import { PortionItem } from "./AdvancedAddPage";

type User = {
  id: string;
  name: string;
  sex: string;
  avatarUrl?: string;
};

type Macros = {
  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;
};

type Props = {
  users: User[];
  portions: PortionItem[];
  onChange: (v: PortionItem[]) => void;
  macrosPer100g?: Macros; // 🔥 ДОДАЛИ
};

export function UserPortionSelector({
  users,
  portions,
  onChange,
  macrosPer100g,
}: Props) {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  function isSelected(userId: string) {
    return portions.some((p) => p.userId === userId);
  }

  function toggle(user: User) {
    const exists = isSelected(user.id);

    if (exists) {
      onChange(portions.filter((p) => p.userId !== user.id));
      if (expandedUserId === user.id) setExpandedUserId(null);
    } else {
      onChange([...portions, { userId: user.id, grams: 100, name: user.name }]);
      setExpandedUserId(user.id);
    }
  }

  function update(userId: string, grams: number) {
    onChange(portions.map((p) => (p.userId === userId ? { ...p, grams } : p)));
  }

  function add(userId: string, delta: number) {
    const current = portions.find((p) => p.userId === userId);
    if (!current) return;

    update(userId, Math.max(0, current.grams + delta));
  }

  function calc(value?: number, grams?: number) {
    if (!value || !grams) return 0;
    return Math.round((value * grams) / 100);
  }

  return (
    <div className="bg-white p-4 rounded-2xl space-y-3">
      <div className="text-sm text-gray-500">Кому</div>

      {users.map((user) => {
        const selected = isSelected(user.id);
        const portion = portions.find((p) => p.userId === user.id);

        const defaultAvatar =
          user.sex === "female"
            ? "/avatars/default-female.jpg"
            : "/avatars/default-male.jpg";

        const expanded = expandedUserId === user.id;

        return (
          <div key={user.id} className="space-y-2">
            {/* USER ROW */}
            <button
              onClick={() => toggle(user)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition
                ${
                  selected
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-transparent"
                }`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={user.avatarUrl || defaultAvatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-left text-sm font-medium">
                {user.name}
              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center
                  ${
                    selected
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
              >
                {selected && <Check size={14} className="text-white" />}
              </div>
            </button>

            {/* EXPANDED PORTION */}

            {selected && expanded && portion && (
              <div className="ml-12 bg-gray-50 rounded-xl p-3 space-y-3">
                {/* CONTROLS */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => add(user.id, -50)}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    inputMode="numeric"
                    value={portion.grams}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (isNaN(value)) return;
                      update(user.id, Math.max(1, value));
                    }}
                    className="w-full text-center font-semibold bg-white border rounded-lg py-1"
                  />

                  <span className="text-sm text-gray-500">г</span>

                  <button
                    onClick={() => add(user.id, 50)}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* QUICK PRESETS */}
                <div className="flex gap-2">
                  {[100, 150, 200].map((g) => (
                    <button
                      key={g}
                      onClick={() => update(user.id, g)}
                      className="flex-1 py-1 text-xs rounded-lg bg-white border"
                    >
                      {g} г
                    </button>
                  ))}
                </div>

                {/* 🔥 MACROS */}
                {macrosPer100g && (
                  <div className="text-xs text-gray-600">
                    🔥 {calc(macrosPer100g.calories, portion.grams)} ккал
                    <span className="text-gray-400">
                      {" "}
                      • Б {calc(macrosPer100g.proteins, portion.grams)}
                    </span>
                    <span className="text-gray-400">
                      {" "}
                      • Ж {calc(macrosPer100g.fats, portion.grams)}
                    </span>
                    <span className="text-gray-400">
                      {" "}
                      • В {calc(macrosPer100g.carbs, portion.grams)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
