"use client";

import { TabType } from "../types/add-meal-plan.types";

type Props = {
  active: TabType;
  onChange: (tab: TabType) => void;
};

const tabs: { key: TabType; label: string }[] = [
  { key: "cookbook", label: "Моя книга" },
  { key: "recipes", label: "Рецепти" },
  { key: "products", label: "Продукти" },
];

export function AddTabs({ active, onChange }: Props) {
  return (
    <div className="bg-white border-b">
      <div className="flex overflow-x-auto px-4">
        {tabs.map((tab) => {
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`
                py-3 mr-6 text-sm font-medium whitespace-nowrap
                transition-colors
                ${
                  isActive
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
