import { readSheet } from "@/lib/sheets.read";

export type MenuDay = {
  menu_day_id: string;
  date: string;
};

export type MenuPlanDetails = {
  menu_plan_id: string;
  family_id: string;
  start_date: string;
  end_date: string;
  days: MenuDay[];
};

export async function getMenuPlanDetails(
  planId: string,
): Promise<MenuPlanDetails | null> {
  const planRows = await readSheet("menu_plans!A2:F");
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

  return {
    menu_plan_id: planRow[0],
    family_id: planRow[1],
    start_date: planRow[2],
    end_date: planRow[3],
    days,
  };
}
