"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MenuEntry } from "@/types/menu-entry";
import { NutrientsMap } from "@/types/nutrients";
import MemberSelector from "./MemberSelector";
import DaySelector from "./DaySelector";
import NutritionPreview from "./NutritionPreview";
import {
  createEntryAction,
  updateEntryAction,
  deleteEntryAction,
} from "@/app/plan/actions/menu-entry.actions";

type Props = {
  formMode: "create" | "edit";
  planId: string;
  entryType: "recipe" | "product";
  entryId: string;
  mealTypeId: number;
  existingEntry?: MenuEntry;
  members: { user_id: string; first_name: string }[];
  defaultWeight: number;
  baseWeight: number;
  unit: "g" | "ml" | "pcs";
  nutrients: NutrientsMap;
  fullWeek: string[];
  date: string;
};

export default function PlanningForm({
  formMode,
  planId,
  entryType,
  entryId,
  mealTypeId,
  members,
  defaultWeight,
  baseWeight,
  unit,
  nutrients,
  fullWeek,
  date,
  existingEntry,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // ✅ USER
  const [selectedUser, setSelectedUser] = useState<string | null>(
    formMode === "edit"
      ? (existingEntry?.user_id ?? null)
      : (members[0]?.user_id ?? null),
  );

  // ✅ PORTION
  const [portion, setPortion] = useState<number>(
    formMode === "edit"
      ? (existingEntry?.planned_weight_g ??
          existingEntry?.quantity_g ??
          defaultWeight)
      : defaultWeight,
  );

  // ✅ DAYS
  const [selectedDays, setSelectedDays] = useState<string[]>(
    formMode === "edit"
      ? existingEntry?.date
        ? [existingEntry.date]
        : []
      : date
        ? [date]
        : [],
  );

  const isValid =
    selectedUser && selectedDays.length > 0 && portion > 0 && !isPending;

  // =========================
  // CREATE
  // =========================

  const handleCreate = () => {
    if (!isValid) return;

    startTransition(async () => {
      const result = await createEntryAction({
        planId,
        entryType,
        entryId,
        mealTypeId,
        userId: selectedUser!,
        days: selectedDays,
        portion,
      });

      if (result?.success) {
        router.push(
          `/plan/${planId}/add-entry?date=${date}&mealTypeId=${mealTypeId}&userId=${selectedUser}&view=members`,
        );
      }
    });
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdate = () => {
    if (!isValid) return;

    startTransition(async () => {
      const result = await updateEntryAction({
        planId,
        entryType,
        entryId,
        mealTypeId,
        userId: selectedUser!,
        selectedDays,
        portion,
      });

      if (result?.success) {
        router.push(`/plan?date=${date}&view=members`);
      }
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = () => {
    if (!existingEntry) return;

    startTransition(async () => {
      const result = await deleteEntryAction(existingEntry.menu_entry_id);

      if (result?.success) {
        router.push(`/plan?date=${date}&view=members`);
      }
    });
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="bg-white px-5 py-6 space-y-6">
      <div className="px-5 py-6 space-y-6 rounded-2xl border shadow-sm">
        <h2 className="text-lg font-semibold">
          🗓 Планування {entryType === "recipe" ? "страви" : "продукту"}
        </h2>

        {/* MEMBER */}
        <MemberSelector
          members={members}
          selectedUser={selectedUser}
          onChange={setSelectedUser}
        />

        {/* DAYS */}
        <DaySelector
          fullWeek={fullWeek}
          selectedDays={selectedDays}
          onChange={setSelectedDays}
          mode="multi"
        />

        {/* PORTION */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            🍽 Кількість ({unit})
          </label>

          <input
            type="number"
            min={1}
            value={portion}
            onChange={(e) => setPortion(Number(e.target.value))}
            className="w-full border border-purple-600 rounded-full px-5 py-3 outline-none"
          />
        </div>

        {/* ACTIONS */}
        {formMode === "create" && (
          <button
            disabled={!isValid}
            onClick={handleCreate}
            className="w-full bg-purple-600 text-white py-3 rounded-full text-sm font-medium disabled:opacity-40"
          >
            ➕ Додати
          </button>
        )}

        {formMode === "edit" && (
          <div className="flex justify-between gap-3">
            <button
              disabled={isPending}
              onClick={handleDelete}
              className="w-2/5 border-2 border-purple-600 py-3 px-6 rounded-full text-sm font-medium"
            >
              🗑 Видалити
            </button>

            <button
              disabled={!isValid}
              onClick={handleUpdate}
              className="w-2/5 bg-purple-600 text-white py-3 px-6 rounded-full text-sm font-medium disabled:opacity-40"
            >
              💾 Зберегти
            </button>
          </div>
        )}
      </div>

      {/* NUTRITION PREVIEW */}
      <NutritionPreview
        nutrients={nutrients}
        portion={portion}
        baseWeight={baseWeight}
      />
    </div>
  );
}

// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { MenuEntry } from "@/types/menu-entry";
// import { NutrientsMap } from "@/types/nutrients";
// import MemberSelector from "./MemberSelector";
// import DaySelector from "./DaySelector";
// import NutritionPreview from "./NutritionPreview";
// import {
//   createEntryAction,
//   updateEntryAction,
//   deleteEntryAction,
// } from "@/app/plan/actions/menu-entry.actions";

// type Props = {
//   formMode: "create" | "edit";
//   planId: string;
//   entryType: "recipe" | "product";
//   entryId: string;
//   mealTypeId: number;
//   existingEntry?: MenuEntry;
//   members: { user_id: string; first_name: string }[];
//   defaultWeight: number;
//   baseWeight: number;
//   unit: "g" | "ml" | "pcs";
//   nutrients: NutrientsMap;
//   fullWeek: string[];
//   date: string;
// };

// export default function PlanningForm({
//   formMode,
//   planId,
//   entryType,
//   entryId,
//   mealTypeId,
//   members,
//   defaultWeight,
//   baseWeight,
//   nutrients,
//   fullWeek,
//   date,
//   existingEntry,
// }: Props) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const [selectedUser, setSelectedUser] = useState<string | null>(
//     formMode === "edit"
//       ? (existingEntry?.user_id ?? null)
//       : (members[0]?.user_id ?? null),
//   );

//   const [portion, setPortion] = useState(
//     formMode === "edit"
//       ? (existingEntry?.planned_weight_g ??
//           existingEntry?.quantity_g ??
//           defaultWeight)
//       : defaultWeight,
//   );

//   const [selectedDays, setSelectedDays] = useState(
//     formMode === "edit" ? [existingEntry?.date ?? ""] : [date],
//   );

//   const handleCreate = () => {
//     startTransition(async () => {
//       const result = await createEntryAction({
//         planId,
//         entryType,
//         entryId,
//         mealTypeId,
//         userId: selectedUser!,
//         days: selectedDays,
//         portion,
//       });

//       if (result?.success) {
//         router.push(
//           `/plan/${planId}/add-entry?date=${date}&mealTypeId=${mealTypeId}&userId=${selectedUser}&view=members`,
//         );
//       }
//     });
//   };

//   const handleUpdate = () => {
//     startTransition(async () => {
//       const result = await updateEntryAction({
//         planId,
//         entryType,
//         entryId,
//         mealTypeId,
//         userId: selectedUser!,
//         selectedDays,
//         portion,
//       });

//       if (result?.success) {
//         router.push(`/plan?date=${date}&view=members`);
//       }
//     });
//   };

//   const handleDelete = () => {
//     if (!existingEntry) return;

//     startTransition(async () => {
//       const result = await deleteEntryAction(existingEntry.menu_entry_id);
//       if (result?.success) {
//         router.push(`/plan?date=${date}&view=members`);
//       }
//     });
//   };

//   return (
//     <div className="bg-white px-5 py-6 space-y-6">
//       <div className="px-5 py-6 space-y-6 rounded-2xl border shadow-sm">
//         <h2 className="text-lg font-semibold">🗓 Планування страви</h2>

//         <MemberSelector
//           members={members}
//           selectedUser={selectedUser ?? null}
//           onChange={setSelectedUser}
//         />

//         <DaySelector
//           fullWeek={fullWeek}
//           selectedDays={selectedDays}
//           onChange={setSelectedDays}
//           mode="multi"
//         />

//         <input
//           type="number"
//           min={1}
//           value={portion}
//           onChange={(e) => setPortion(Number(e.target.value))}
//           className="w-full border border-purple-600 rounded-full px-5 py-3 outline-none"
//         />

//         {formMode === "create" && (
//           <button
//             disabled={isPending}
//             onClick={handleCreate}
//             className="primary w-full bg-purple-600 text-white py-3 rounded-full text-sm font-medium"
//           >
//             ➕ Додати
//           </button>
//         )}

//         {formMode === "edit" && (
//           <div className="flex justify-between gap-3">
//             <button
//               disabled={isPending}
//               onClick={handleDelete}
//               className="outline-danger w-2/5 border-2 border-purple-600 py-3 px-6 rounded-full text-sm font-medium"
//             >
//               🗑 Видалити
//             </button>

//             <button
//               disabled={isPending}
//               onClick={handleUpdate}
//               className="primary w-2/5 bg-purple-600 text-white py-3 px-6 rounded-full text-sm font-medium"
//             >
//               💾 Зберегти
//             </button>
//           </div>
//         )}
//       </div>
//       <NutritionPreview
//         nutrients={nutrients}
//         portion={portion}
//         baseWeight={baseWeight}
//       />
//     </div>
//   );
// }
