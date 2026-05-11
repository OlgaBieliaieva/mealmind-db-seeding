"use client";

type MealType = {
  id: string;
  name: string;
};

type Props = {
  mealTypes: MealType[];
  selected: string | null;
  onChange: (id: string) => void;
};

export function MealTypeSelector({
  mealTypes,
  selected,
  onChange,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl space-y-3">
      <div className="text-sm text-gray-500">Прийом їжі</div>

      <div className="flex flex-wrap gap-2">
        {mealTypes.map((m) => {
          const active = m.id === selected;

          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition
                ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-800"
                }`}
            >
              {m.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}