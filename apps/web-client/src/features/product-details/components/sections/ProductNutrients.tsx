"use client";

import {
  ProductDetailsDTO,
  NutrientGroupDTO,
  NutrientDTO,
} from "../../types/product-details.types";

const GROUP_LABELS: Record<string, string> = {
  macros: "Макронутрієнти",
  fats: "Жири",
  carbs: "Вуглеводи",
  vitamins: "Вітаміни",
  minerals: "Мінерали",
  other: "Інше",
};

export function ProductNutrients({ product }: { product: ProductDetailsDTO }) {
  const groups = groupByNutrientGroup(product.nutrients);

  return (
    <div className="px-4 mt-4 space-y-6">
      <div className="text-xs text-gray-400">
        Значення наведені на 100 г продукту
      </div>

      {groups.map((group) => (
        <div key={group.group}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            {GROUP_LABELS[group.group] ?? group.group}
          </h3>

          <div className="bg-white rounded-2xl shadow-sm divide-y">
            {group.items.map((n) => (
              <NutrientRow key={n.code} nutrient={n} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function NutrientRow({
  nutrient,
}: {
  nutrient: {
    code: string;
    name: string;
    value: number;
    unit: string;
  };
}) {
  return (
    <div className="p-3 space-y-1">
      {/* верхній ряд */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">{nutrient.name}</span>

        <span className="text-sm font-medium text-gray-900">
          {formatValue(nutrient.value)} {nutrient.unit}
        </span>
      </div>

      {/* subtle bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400"
          style={{
            width: `${getVisualPercent(nutrient.value)}%`,
          }}
        />
      </div>
    </div>
  );
}

function getVisualPercent(value: number) {
  // нормалізація для UI (щоб бари не були всі 0 або 100)
  const max = 100;

  return Math.min((value / max) * 100, 100);
}

function formatValue(value: number) {
  if (value < 1) return value.toFixed(2);
  if (value < 10) return value.toFixed(1);
  return Math.round(value);
}

export function groupByNutrientGroup(
  nutrients: NutrientDTO[],
): NutrientGroupDTO[] {
  const groups: Record<string, NutrientDTO[]> = {};

  for (const n of nutrients) {
    const key = n.uiGroup; // ✅ ВАЖЛИВО

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(n);
  }

  return Object.entries(groups).map(([group, items]) => ({
    group,
    items: items.sort((a, b) => a.sortOrder - b.sortOrder),
  }));
}
