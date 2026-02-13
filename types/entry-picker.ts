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

export type PickerItem = PickerRecipeItem | PickerProductItem;
