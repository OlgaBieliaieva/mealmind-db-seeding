export type PickerRecipeItem = {
  type: "recipe";
  id: string;
  title: string;
};

export type PickerProductItem = {
  type: "product";
  id: string;
  title: string;
};

export type SelectedEntry = {
  entry_type: "recipe" | "product";
  entry_id: string;
};

export type PickerItem = PickerRecipeItem | PickerProductItem;
