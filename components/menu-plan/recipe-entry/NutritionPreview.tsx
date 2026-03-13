"use client";

import { useMemo, useState } from "react";
import { NutrientsMap } from "@/domains/nutrition/types/nutrient-value.types";
import { useNutrientsReference } from "@/lib/v1/hooks/useNutrientsReference";

type Props = {
  nutrients: NutrientsMap;
  portion: number;
  baseWeight: number;
};

export default function NutritionPreview({
  nutrients,
  portion,
  baseWeight,
}: Props) {
  const { items: refs, loading } = useNutrientsReference();
  const [expanded, setExpanded] = useState(false);

  // const referenceMap = useMemo(() => {
  //   const map: Record<string, string> = {};
  //   refs.forEach((r) => {
  //     map[String(r.nutrient_id)] = r.name.ua;
  //   });
  //   return map;
  // }, [refs]);

  // const nutrientGroupMap = useMemo(() => {
  //   const map: Record<string, string> = {};
  //   refs.forEach((r) => {
  //     map[String(r.nutrient_id)] = r.nutrient_group;
  //   });
  //   return map;
  // }, [refs]);

  // const scaled = useMemo(() => {
  //   return Object.entries(nutrients).map(([id, data]) => {
  //     const value = baseWeight > 0 ? (data.value * portion) / baseWeight : 0;

  //     return {
  //       id,
  //       group: nutrientGroupMap[id],
  //       name: referenceMap[id] ?? `Нутрієнт #${id}`,
  //       value,
  //       unit: data.unit,
  //     };
  //   });
  // }, [nutrients, portion, baseWeight, referenceMap, nutrientGroupMap]);

  // if (loading) return null;

  // // 🔹 Визначаємо макроси (можеш змінити ID якщо потрібно)
  // const macros = scaled.filter((n) => n.group === "macro");

  // const micros = scaled.filter((n) => n.group !== "macro");

  return (
    <div className="rounded-2xl border p-5 bg-gradient-to-br from-purple-50 to-white space-y-5">
      <div>
        <h3 className="text-base font-semibold text-gray-800">
          🔎 Поживна цінність на {portion} г
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Розраховано автоматично відповідно до обраної порції
        </p>
      </div>
      {/* ================= MACROS ================= */}
      {/* <div className="grid grid-cols-2 gap-4">
        {macros.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-xl p-4 shadow-sm border flex flex-col"
          >
            <span className="text-xs text-gray-400">{n.name}</span>
            <span className="text-lg font-semibold text-gray-800">
              {n.value.toFixed(1)} {n.unit}
            </span>
          </div>
        ))}
      </div> */}
      {/* ================= MICRO TOGGLE ================= */}
      {/* {micros.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="text-sm text-purple-600 font-medium"
          >
            {expanded ? "▲ Сховати деталі" : "▼ Показати всі нутрієнти"}
          </button>

          {expanded && (
            <div className="flex flex-col gap-3 text-sm">
              {micros.map((n) => (
                <div key={n.id} className="flex justify-between">
                  <span className="text-gray-500">{n.name}</span>
                  <span className="font-medium">
                    {n.value.toFixed(2)} {n.unit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}
    </div>
  );
}
