export function RecipeTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  const tabs = [
    { key: "overview", label: "Огляд" },
    { key: "ingredients", label: "Інгредієнти" },
    { key: "steps", label: "Кроки" },
    { key: "nutrients", label: "Нутрієнти" },
  ];

  return (
    <div className="flex border-b">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex-1 py-3 text-sm font-medium ${
            active === t.key
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
