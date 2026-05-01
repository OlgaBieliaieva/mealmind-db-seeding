"use client";

export function ProductTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  const tabs = [
    { key: "overview", label: "Огляд" },
    { key: "nutrients", label: "Нутрієнти" },
    { key: "recipes", label: "Рецепти" },
  ];

  return (
    <div className="px-4 mt-4">
      <div className="bg-gray-100 rounded-xl p-1 flex">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`flex-1 py-2 text-sm rounded-lg ${
              active === t.key ? "bg-white shadow text-black" : "text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// "use client";

// type Tab = "overview" | "nutrients";

// export function ProductTabs({
//   active,
//   onChange,
// }: {
//   active: Tab;
//   onChange: (tab: Tab) => void;
// }) {
//   return (
//     <div className="flex border-b">
//       {[
//         { key: "overview", label: "Огляд" },
//         { key: "nutrients", label: "Нутрієнти" },
//       ].map((t) => (
//         <button
//           key={t.key}
//           onClick={() => onChange(t.key as Tab)}
//           className={`flex-1 py-3 text-sm font-medium ${
//             active === t.key
//               ? "border-b-2 border-green-500 text-green-600"
//               : "text-gray-500"
//           }`}
//         >
//           {t.label}
//         </button>
//       ))}
//     </div>
//   );
// }
