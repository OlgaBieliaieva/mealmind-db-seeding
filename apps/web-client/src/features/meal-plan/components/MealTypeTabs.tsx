"use client";

type Props = {
  mealTypes: { id: string; name: string }[];
  active: string;
  onChange: (id: string) => void;
};

export function MealTypeTabs({ mealTypes, active, onChange }: Props) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-2 px-1">
        {mealTypes.map((m) => {
          const isActive = active === m.id;

          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className={`
                px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all
                ${
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 active:scale-95"
                }
              `}
            >
              {m.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
