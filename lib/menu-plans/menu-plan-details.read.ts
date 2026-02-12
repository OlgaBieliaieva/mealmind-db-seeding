import { readSheet } from "@/lib/sheets.read";
import { getMenuEntries } from "@/lib/menu-entries/menu-entries.read";
import { MenuEntry } from "@/types/menu-entry";

export type MenuDay = {
  menu_day_id: string;
  date: string;
};

export type MenuPlanDetails = {
  menu_plan_id: string;
  family_id: string;
  start_date: string;
  end_date: string;
  days: {
    menu_day_id: string;
    date: string;
  }[];
  entries: MenuEntry[];

  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
};

export async function getMenuPlanDetails(
  planId: string,
): Promise<MenuPlanDetails | null> {
  const planRows = await readSheet("menu_plans!A2:H");
  const dayRows = await readSheet("menu_days!A2:D");

  const planRow = planRows.find((row) => row[0] === planId);

  if (!planRow) return null;

  const days = dayRows
    .filter((row) => row[1] === planId)
    .map((row) => ({
      menu_day_id: row[0],
      date: row[2],
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const allEntries = await getMenuEntries();
  const entries = allEntries.filter((entry) =>
    days.some((d) => d.menu_day_id === entry.menu_day_id),
  );
  // 🔹 Collect unique recipe/product ids
  const recipeIds = new Set<string>();
  const productIds = new Set<string>();

  entries.forEach((entry) => {
    if (entry.entry_type === "recipe") {
      recipeIds.add(entry.entry_id);
    }

    if (entry.entry_type === "product") {
      productIds.add(entry.entry_id);
    }
  });

  const recipeRows = await readSheet("recipes!A2:C");
  const productRows = await readSheet("products!A2:E");
  const brandRows = await readSheet("brands!A2:C");
  const recipesMap: Record<string, string> = {};
  const productsMap: Record<string, string> = {};
  const brandsMap: Record<string, string> = {};

  recipeRows.forEach((row) => {
    const recipe_id = row[0];
    const title = row[1];

    if (recipeIds.has(recipe_id)) {
      recipesMap[recipe_id] = title;
    }
  });

  brandRows.forEach((row) => {
    const brand_id = row[0];
    const name_ua = row[2];

    brandsMap[brand_id] = name_ua;
  });

  productRows.forEach((row) => {
    const product_id = row[0];
    const name_ua = row[2];
    const brand_id = row[4]; // колонка E

    if (!productIds.has(product_id)) return;

    let displayName = name_ua;

    if (brand_id && brandsMap[brand_id]) {
      displayName = `${name_ua} · ${brandsMap[brand_id]}`;
    }

    productsMap[product_id] = displayName;
  });

  return {
    menu_plan_id: planRow[0],
    family_id: planRow[1],
    start_date: planRow[2],
    end_date: planRow[3],
    days,
    entries,
    recipesMap,
    productsMap,
  };
}
