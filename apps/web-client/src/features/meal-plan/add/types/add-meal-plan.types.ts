export type TabType = "cookbook" | "recipes" | "products";

export type AddUser = {
  id: string;
  name: string;
  avatarUrl?: string | null;
};

export type AddMealType = {
  id: string;
  name: string;
};

export type SelectedItem = {
  id: string;
  type: "recipe" | "product";
  amount: number;
  unit: "g";
};

export type CreateMealEntriesDTO = {
  entries: {
    date: string;
    userId: string;
    mealTypeId: string;

    recipeId?: string;
    productId?: string;

    amount: number;
    unit: "g" | "ml" | "portion";
  }[];
};
