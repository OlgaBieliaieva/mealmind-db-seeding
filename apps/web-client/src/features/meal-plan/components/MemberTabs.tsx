"use client";

type Tab = {
  id: string;
  name: string;
};

type Props = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
};

export function MemberTabs({ tabs, active, onChange }: Props) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === active;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition ${
                isActive
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}