"use client";

import { Card } from "./components/Card";
import { StatCard } from "./components/StatCard";
import { MacroItem } from "./components/MacroItem";
import { MetaRow } from "./components/MetaRow";
import { RecipeAuthorCard } from "./components/RecipeAuthorCard";
import { ExpandableText } from "./components/ExpandableText";

import { getCuisineLabel } from "./utils/getCuisineLabel";
import { getDifficultyLabel } from "./utils/getDifficultyLabel";

import { RecipeDetailsDTO } from "../../../types/recipe-details.types";

export function RecipeOverview({ recipe }: { recipe: RecipeDetailsDTO }) {
  const { macros } = recipe;

  return (
    <div className="mt-4 space-y-5">
      {/* PRIMARY */}
      <section className="grid grid-cols-4 gap-2">
        <StatCard label="Підготовка" value={`${recipe.prepTime ?? 0} хв`} />
        <StatCard label="Готування" value={`${recipe.cookTime ?? 0} хв`} />

        <StatCard
          label="Порції"
          value={`${recipe.baseServings ?? 0}`}
          sub={`~${Math.round(recipe.baseServingWeightG)} г`}
        />

        {recipe.difficulty && (
          <StatCard
            label="Складність"
            value={getDifficultyLabel(recipe.difficulty)}
          />
        )}
      </section>

      {/* MACROS */}
      <Card>
        <div className="text-xs text-gray-400 mb-2">На 100 г</div>

        <div className="grid grid-cols-4 gap-3 text-center">
          <MacroItem label="Ккал" value={macros.calories} />
          <MacroItem label="Б" value={macros.proteins} />
          <MacroItem label="Ж" value={macros.fats} />
          <MacroItem label="В" value={macros.carbs} />
        </div>
      </Card>

      {/* META */}
      <Card>
        <MetaRow label="Тип" value={recipe.categoryName} icon="🍽" />
        <MetaRow
          label="Кухня"
          value={getCuisineLabel(recipe.cuisines)}
          icon="🌍"
        />
      </Card>

      {/* AUTHOR */}
      <RecipeAuthorCard author={recipe.author} />

      {/* DESCRIPTION */}
      {recipe.fullDescription && (
        <Card>
          <ExpandableText text={recipe.fullDescription} lines={2} />
        </Card>
      )}
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { FaInstagram, FaYoutube, FaTiktok, FaGlobe } from "react-icons/fa";
// import { RecipeDetailsDTO } from "../../../types/recipe-details.types";

// export function RecipeOverview({ recipe }: { recipe: RecipeDetailsDTO }) {
//   const { macros } = recipe;

//   return (
//     <div className="mt-4 space-y-5 px-4">
//       {/* PRIMARY */}
//       <div className="grid grid-cols-4 gap-2">
//         <Stat label="Підготовка" value={`${recipe.prepTime ?? 0} хв`} />
//         <Stat label="Готування" value={`${recipe.cookTime ?? 0} хв`} />

//         <Stat
//           label="Порції"
//           value={`${recipe.baseServings ?? 0}`}
//           sub={`~${Math.round(recipe.baseServingWeightG)} г`}
//         />

//         {recipe.difficulty && (
//           <Stat
//             label="Складність"
//             value={getDifficultyLabel(recipe.difficulty)}
//           />
//         )}
//       </div>

//       {/* MACROS */}
//       <Card>
//         <div className="text-xs text-gray-400">На 100 г</div>

//         <div className="grid grid-cols-4 gap-3 text-center mt-2">
//           <Macro label="Ккал" value={macros.calories} />
//           <Macro label="Б" value={macros.proteins} />
//           <Macro label="Ж" value={macros.fats} />
//           <Macro label="В" value={macros.carbs} />
//         </div>
//       </Card>

//       {/* META */}
//       <Card>
//         <MetaRow label="Тип" value={recipe.categoryName} icon="🍽" />
//         <MetaRow
//           label="Кухня"
//           value={getCuisineLabel(recipe.cuisines)}
//           icon="🌍"
//         />
//       </Card>

//       {/* AUTHOR */}
//       <RecipeAuthor author={recipe.author} />

//       {/* DESCRIPTION */}
//       {recipe.fullDescription && (
//         <Card>
//           <ExpandableText text={recipe.fullDescription} lines={2} />
//         </Card>
//       )}
//     </div>
//   );
// }

// function Card({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
//       {children}
//     </div>
//   );
// }

// function Stat({
//   label,
//   value,
//   sub,
// }: {
//   label: string;
//   value: string;
//   sub?: string;
// }) {
//   return (
//     <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
//       <div className="text-sm font-semibold text-gray-900">{value}</div>

//       {sub && <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>}

//       <div className="text-[10px] text-gray-400 mt-1">{label}</div>
//     </div>
//   );
// }

// function Macro({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="text-sm font-semibold text-gray-900">
//         {Math.round(value)}
//       </div>
//       <div className="text-[11px] text-gray-400">{label}</div>
//     </div>
//   );
// }

// function MetaRow({
//   label,
//   value,
//   icon,
// }: {
//   label: string;
//   value?: string | null;
//   icon?: string;
// }) {
//   if (!value) return null;

//   return (
//     <div className="flex items-center gap-2 text-sm">
//       <div className="text-gray-500">
//         {icon} {label}
//       </div>
//       <div className="text-gray-900 font-medium">{value}</div>
//     </div>
//   );
// }

// function RecipeAuthor({ author }: { author: RecipeDetailsDTO["author"] }) {
//   if (!author) return null;

//   return (
//     <Card>
//       <div className="flex gap-3">
//         {author.avatarUrl ? (
//           <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
//             <Image
//               src={author.avatarUrl}
//               alt={author.name}
//               fill
//               className="object-cover"
//             />
//           </div>
//         ) : (
//           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//             👤
//           </div>
//         )}

//         <div className="flex-1">
//           <div className="text-sm font-semibold text-gray-900">
//             {author.name}
//           </div>

//           {author.bio && <ExpandableText text={author.bio} lines={2} />}

//           {author.profileUrl && (
//             <a
//               href={author.profileUrl}
//               target="_blank"
//               className="text-xs text-gray-400"
//             >
//               Переглянути профіль
//             </a>
//           )}
//         </div>
//       </div>

//       {author.links && author.links.length > 0 && (
//         <div className="flex gap-3 mt-3">
//           {author.links.map((l) => (
//             <a key={l.url} href={l.url} target="_blank">
//               {getPlatformIcon(l.type)}
//             </a>
//           ))}
//         </div>
//       )}
//     </Card>
//   );
// }

// function getDifficultyLabel(level: "easy" | "medium" | "hard") {
//   return {
//     easy: "Легко",
//     medium: "Середньо",
//     hard: "Складно",
//   }[level];
// }

// function getCuisineLabel(cuisines?: { name: string }[]) {
//   if (!cuisines || cuisines.length === 0) return null;

//   if (cuisines.length === 1) return cuisines[0].name;

//   return `${cuisines[0].name} +${cuisines.length - 1}`;
// }

// function getPlatformIcon(type: string) {
//   const cls = "w-5 h-5 text-gray-600";

//   switch (type) {
//     case "instagram":
//       return <FaInstagram className={cls} />;
//     case "youtube":
//       return <FaYoutube className={cls} />;
//     case "tiktok":
//       return <FaTiktok className={cls} />;
//     case "website":
//       return <FaGlobe className={cls} />;
//     default:
//       return <FaGlobe className={cls} />;
//   }
// }

// function ExpandableText({ text, lines = 3 }: { text: string; lines?: number }) {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div>
//       <p
//         className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line ${
//           expanded ? "" : `line-clamp-${lines}`
//         }`}
//       >
//         {text}
//       </p>

//       <button
//         onClick={() => setExpanded((v) => !v)}
//         className="text-xs text-green-600 mt-1"
//       >
//         {expanded ? "Згорнути" : "Читати далі"}
//       </button>
//     </div>
//   );
// }
