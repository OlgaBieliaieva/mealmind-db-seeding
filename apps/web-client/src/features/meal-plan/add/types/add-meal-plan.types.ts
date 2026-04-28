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
