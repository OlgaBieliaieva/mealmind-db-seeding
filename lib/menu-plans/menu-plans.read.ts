import { readSheet } from "@/lib/sheets.read";

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

  return planRows.map((row) => ({
    menu_plan_id: row[0],
    family_name: familiesMap.get(row[1]) ?? "Unknown family",
    start_date: row[2],
    end_date: row[3],
    status: row[4],
  }));
}
