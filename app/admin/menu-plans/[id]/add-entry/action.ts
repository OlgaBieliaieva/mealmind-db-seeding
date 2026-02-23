"use server";

import { revalidatePath } from "next/cache";
import { createMenuEntry } from "@/lib/menu-entries/menu-entries.write";
import { getAllProducts } from "@/lib/products.read";
import { toggleProductFavorite } from "@/lib/product-favorites.write";

type SaveEntriesInput = {
  menu_plan_id: string;
  date: string;
  meal_type_id: number;
  user_id: string;
  items: {
    entry_type: "recipe" | "product";
    entry_id: string;
  }[];
};

export async function saveMenuEntries(input: SaveEntriesInput) {
  const products = await getAllProducts();

  for (const item of input.items) {
    if (item.entry_type === "recipe") {
      await createMenuEntry({
        menu_plan_id: input.menu_plan_id,
        date: input.date,
        user_id: input.user_id,
        meal_type_id: input.meal_type_id,
        entry_type: item.entry_type,
        entry_id: item.entry_id,
        servings: 1,
        quantity: null,
      });
    }

    if (item.entry_type === "product") {
      const product = products.find((p) => p.product_id === item.entry_id);

      const unit = product?.unit ?? "g";

      let quantity = 100;

      if (unit === "pcs") {
        quantity = 1;
      }

      await createMenuEntry({
        menu_plan_id: input.menu_plan_id,
        date: input.date,
        user_id: input.user_id,
        meal_type_id: input.meal_type_id,
        entry_type: item.entry_type,
        entry_id: item.entry_id,
        servings: 1,
        quantity,
      });
    }
  }

  revalidatePath("/plan");
}

export async function toggleFavoriteAction(
  productId: string,
  userId: string,
  familyId: string,
) {
  await toggleProductFavorite(productId, userId, familyId);
}
