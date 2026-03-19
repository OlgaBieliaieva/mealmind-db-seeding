import {
  ProductType,
  ProductUnit,
  ProductState,
} from "@/domains/product/constants/product.constants";

export type ProductDetailsDTO = {
  id: string;
  name: string;

  nameEn?: string | null;
  barcode?: string | null;
  notes?: string | null;
  isVerified?: boolean;
  source?: string | null;

  type: ProductType;
  unit: ProductUnit;
  rawOrCooked: ProductState;

  category?: {
    leafId: string;
    leafName: string;

    rootId?: string;
    rootName?: string;
  };

  brand?: {
    id: string;
    name: string;
  };

  parent?: {
    id: string;
    name: string;
  };

  cookingFactors?: {
    ediblePartPct?: number | null;
    cookingLossPct?: number | null;
    yieldFactor?: number | null;

    inheritedFromGeneric?: boolean;
  };

  nutrients?: Record<
    string,
    {
      name: string;
      value: number;
      unit: string;
    }
  >;

  photos?: Array<{
    id: string;
    url: string;
    type: string;
    isPrimary?: boolean;
  }>;
};
