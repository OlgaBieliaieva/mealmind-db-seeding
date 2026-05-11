"use client";

type Macros = {
  calories?: number;
  proteins?: number;
  fats?: number;
  carbs?: number;
};

type Props = {
  entriesCount: number;
  totalGrams: number;
  macrosPer100g?: Macros;
};

export function SummaryPreview({
  entriesCount,
  totalGrams,
  macrosPer100g,
}: Props) {
  function calc(value?: number) {
    if (!value || !totalGrams) return 0;
    return Math.round((value * totalGrams) / 100);
  }

  const calories = calc(macrosPer100g?.calories);
  const proteins = calc(macrosPer100g?.proteins);
  const fats = calc(macrosPer100g?.fats);
  const carbs = calc(macrosPer100g?.carbs);

  return (
    <div className="bg-green-50 p-4 rounded-2xl space-y-2">
      {/* TOP */}
      <div className="text-sm text-green-700 font-medium">
        Буде створено: {entriesCount}
      </div>

      <div className="text-xs text-green-600">
        {totalGrams} г × користувачі × дні
      </div>

      {/* 🔥 MACROS */}
      {macrosPer100g && (
        <div className="text-sm text-green-800 font-medium pt-2 border-t border-green-200">
          🔥 {calories} ккал
          <span className="text-green-700 text-xs ml-2">
            • Б {proteins} • Ж {fats} • В {carbs}
          </span>
        </div>
      )}
    </div>
  );
}
