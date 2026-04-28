"use client";

type Props = {
  open: boolean;
  mealTypes: { id: string; name: string }[];
  selectedMealTypeId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export function MealTypePickerSheet({
  open,
  mealTypes,
  selectedMealTypeId,
  onSelect,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* SHEET */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4 pb-20">
        <div className="mb-3 text-sm text-gray-500">Оберіть прийом їжі</div>

        <div className="space-y-2">
          {mealTypes.map((m) => {
            const active = m.id === selectedMealTypeId;

            return (
              <button
                key={m.id}
                onClick={() => onSelect(m.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg
                  ${active ? "bg-green-100 text-green-700" : "bg-gray-100"}
                `}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
