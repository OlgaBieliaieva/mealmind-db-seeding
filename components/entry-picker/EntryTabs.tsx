"use client";

export type EntryTab = "cookbook" | "recipes" | "products" | "favorites";

type Props = {
  activeTab: EntryTab;
  onChange: (tab: EntryTab) => void;
};

const tabs: { key: EntryTab; label: string }[] = [
  { key: "cookbook", label: "Кулінарна книга" },
  { key: "recipes", label: "Рецепти" },
  { key: "products", label: "Їжа" },
  { key: "favorites", label: "Обране" },
];

export default function EntryTabs({ activeTab, onChange }: Props) {
  return (
    <div className="bg-white border-b">
      <div className="flex overflow-x-auto px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`whitespace-nowrap py-3 mr-6 text-sm font-medium transition-colors ${
                isActive
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
