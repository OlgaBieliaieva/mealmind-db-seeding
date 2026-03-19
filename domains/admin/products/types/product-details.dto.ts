import {
  ProductType,
  ProductUnit,
  ProductState,
} from "@/domains/product/constants/product.constants";

export type ProductDetailsDTO = {
  id: string;
  name: string;

  type: ProductType;
  unit: ProductUnit;
  rawOrCooked: ProductState;

  category?: {
    leafId: number;
    leafName: string;
    rootId: number;
    rootName: string;
  };

  brand?: {
    id: number;
    name: string;
  };

  parent?: {
    id: string;
    name: string;
  };
};
