import { readSheet } from "@/lib/sheets.read";
import { getWeekStart } from "@/lib/date/getWeekStart";
import { MenuEntry } from "@/types/menu-entry";

export type MenuPlanListItem = {
  menu_plan_id: string;
  family_name: string;
  start_date: string;
  end_date: string;
  status: string;
};

export async function getMenuPlans(): Promise<MenuPlanListItem[]> {
  const planRows = await readSheet("menu_plans!A2:F");
  const familyRows = await readSheet("families!A2:D");

  const familiesMap = new Map(
    familyRows.map((row) => [row[0], row[1]]), // family_id → name
  );

  const plans = planRows.map((row) => ({
    menu_plan_id: row[0],
    family_name: familiesMap.get(row[1]) ?? "Unknown family",
    start_date: row[2],
    end_date: row[3],
    status: row[4],
  }));

  // Sort by start_date ASC
  plans.sort((a, b) => {
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

  return plans;
}

export async function getMenuPlanFullData(familyId: string, date: string) {
  const weekStart = getWeekStart(date);

  const planRows = await readSheet("menu_plans!A2:F");

  const plan = planRows.find(
    (row) => row[1] === familyId && row[2] === weekStart,
  );

  if (!plan) return null;

  const planId = plan[0];

  const allEntries = await readSheet("menu_entries!A2:J");

  const entries: MenuEntry[] = allEntries
    .filter((row) => row[1] === planId)
    .map((row) => ({
      menu_entry_id: row[0],
      menu_plan_id: row[1],
      date: row[2],
      user_id: row[3],
      meal_type_id: Number(row[4]),
      entry_type: row[5] as "recipe" | "product",
      entry_id: row[6],
      planned_weight_g: row[7] ? Number(row[7]) : null,
      quantity_g: row[8] ? Number(row[8]) : null,
      created_at: row[9] ?? "",
    }));

  // 🔹 Collect ids
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

  const recipeRows = await readSheet("recipes!A2:S");
  const productRows = await readSheet("products!A2:T");
  const brandRows = await readSheet("brands!A2:I");

  const recipesMap: Record<string, string> = {};
  const productsMap: Record<string, string> = {};
  const brandsMap: Record<string, string> = {};
  const recipeWeightMap: Record<string, number> = {};
  const productUnitMap: Record<string, string> = {};

  brandRows.forEach((row) => {
    brandsMap[row[0]] = row[2];
  });

  recipeRows.forEach((row) => {
    const recipe_id = row[0];
    const title = row[1];
    const base_output_weight_g = Number(row[11]);
    const base_servings = Number(row[10]);

    if (recipeIds.has(recipe_id)) {
      recipesMap[recipe_id] = title;
    }

    if (recipeIds.has(recipe_id) && base_servings > 0) {
      recipeWeightMap[recipe_id] = base_output_weight_g / base_servings;
    }
  });

  productRows.forEach((row) => {
    const product_id = row[0];
    const name_ua = row[2];
    const brand_id = row[4];
    const unit = row[9];

    if (!productIds.has(product_id)) return;

    let displayName = name_ua;

    if (brand_id && brandsMap[brand_id]) {
      displayName = `${name_ua} · ${brandsMap[brand_id]}`;
    }

    productsMap[product_id] = displayName;
    productUnitMap[product_id] = unit;
  });

  return {
    planId,
    entries,
    recipesMap,
    productsMap,
    recipeWeightMap,
    productUnitMap,
  };
}
