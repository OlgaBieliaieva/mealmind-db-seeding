import {
  ProductType,
  ProductUnit,
  ProductState,
  ProductPhotoType,
} from "@/domains/product/constants/product.constants";

export type ProductDetailsDTO = {
  id: string;
  name: string;

  nameEn: string;
  barcode?: string | null;
  notes?: string | null;
  isVerified: boolean;
  source?: string | null;

  type: ProductType;
  unit: ProductUnit;
  rawOrCooked: ProductState;

  category: {
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

  cookingFactors: {
    ediblePartPct: number;
    cookingLossPct: number;
    yieldFactor: number;

    inheritedFromGeneric?: boolean;
  };

  nutrients?: Array<{
    nutrientId: string;
    code: string;
    name: string;
    value: number;
    unit: string;
  }>;

  photos: Array<{
    id: string;
    url: string;
    type: ProductPhotoType;
    isPrimary?: boolean;
  }>;
};
