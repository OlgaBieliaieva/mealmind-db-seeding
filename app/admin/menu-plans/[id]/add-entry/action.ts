"use server";

import { createMenuEntry } from "@/lib/menu-entries/menu-entries.write";
import { getAllProducts } from "@/lib/products.read";

type SaveEntriesInput = {
  menu_day_id: string;
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
        menu_day_id: input.menu_day_id,
        user_id: input.user_id,
        meal_type_id: input.meal_type_id,
        entry_type: "recipe",
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
        menu_day_id: input.menu_day_id,
        user_id: input.user_id,
        meal_type_id: input.meal_type_id,
        entry_type: "product",
        entry_id: item.entry_id,
        servings: null,
        quantity,
      });
    }
  }
}
