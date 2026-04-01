import {
  ProductState,
  ProductUnit,
} from "@/shared/domain/constants/product.constants";

export type GenericProduct = {
  product_id: string;

  name: {
    en: string;
    ua: string;
  };

  category_id: string;

  raw_or_cooked_default?: ProductState;

  unit: ProductUnit;

  cooking_loss_pct?: number;
  edible_part_pct?: number;
  yield_factor?: number;
};
