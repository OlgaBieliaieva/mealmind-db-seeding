"use server";

import {
  createMenuEntry,
  updateMenuEntry,
  deleteMenuEntry,
} from "@/lib/menu-entries/menu-entries.write";
import { getMenuEntriesByContext } from "@/lib/menu-entries/menu-entries.read";

/**
 * CREATE
 */
export async function createEntryAction(input: {
  planId: string;
  entryType: "recipe" | "product";
  entryId: string;
  mealTypeId: number;
  userId: string;
  days: string[];
  portion: number;
}) {
  for (const day of input.days) {
    await createMenuEntry({
      menu_plan_id: input.planId,
      date: day,
      user_id: input.userId,
      meal_type_id: input.mealTypeId,
      entry_type: input.entryType,
      entry_id: input.entryId,
      planned_weight_g: input.entryType === "recipe" ? input.portion : null,
      quantity_g: input.entryType === "product" ? input.portion : null,
    });
  }

  return { success: true };
}

/**
 * UPDATE
 */

export async function updateEntryAction(input: {
  planId: string;
  entryType: "recipe" | "product";
  entryId: string;
  mealTypeId: number;
  userId: string;
  selectedDays: string[];
  portion: number;
}) {
  const existingEntries = await getMenuEntriesByContext({
    planId: input.planId,
    entryType: input.entryType,
    entryId: input.entryId,
    userId: input.userId,
    mealTypeId: input.mealTypeId,
  });

  const existingDays = existingEntries.map((e) => e.date);

  const daysToCreate = input.selectedDays.filter(
    (day) => !existingDays.includes(day),
  );

  const daysToDelete = existingDays.filter(
    (day) => !input.selectedDays.includes(day),
  );

  const daysToUpdate = existingDays.filter((day) =>
    input.selectedDays.includes(day),
  );

  // 🔹 CREATE
  for (const day of daysToCreate) {
    await createMenuEntry({
      menu_plan_id: input.planId,
      date: day,
      user_id: input.userId,
      meal_type_id: input.mealTypeId,
      entry_type: input.entryType,
      entry_id: input.entryId,
      planned_weight_g: input.entryType === "recipe" ? input.portion : null,
      quantity_g: input.entryType === "product" ? input.portion : null,
    });
  }

  // 🔹 UPDATE portion
  for (const entry of existingEntries) {
    if (daysToUpdate.includes(entry.date)) {
      await updateMenuEntry(entry, {
        date: entry.date,
        user_id: input.userId,
        meal_type_id: input.mealTypeId,
        planned_weight_g: input.entryType === "recipe" ? input.portion : null,
        quantity_g: input.entryType === "product" ? input.portion : null,
      });
    }
  }

  // 🔹 DELETE
  for (const entry of existingEntries) {
    if (daysToDelete.includes(entry.date)) {
      await deleteMenuEntry(entry.menu_entry_id);
    }
  }

  return { success: true };
}

/**
 * DELETE
 */
export async function deleteEntryAction(menuEntryId: string) {
  await deleteMenuEntry(menuEntryId);

  return { success: true };
}
