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
