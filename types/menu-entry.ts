export type MenuEntry = {
  menu_entry_id: string;
  menu_plan_id: string;
  date: string;
  user_id: string;
  meal_type_id: number;
  entry_type: "recipe" | "product";
  entry_id: string;
  servings: number | null;
  quantity: number | null;
  created_at: string;
};
