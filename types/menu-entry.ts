export type MenuEntry = {
  menu_entry_id: string;
  menu_day_id: string;
  user_id: string;
  meal_type_id: number;
  entry_type: "recipe" | "product";
  entry_id: string;
  servings: number | null;
  quantity: number | null;
  created_at: string;
};
