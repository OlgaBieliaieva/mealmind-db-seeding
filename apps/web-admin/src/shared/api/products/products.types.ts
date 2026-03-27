import {
  ProductStatus,
  ProductType,
} from "@/src/shared/domain/constants/product.constants";

// ===== COMMON =====

export type ProductStatusDto = ProductStatus;

export type ProductTypeDto = ProductType;

// ===== LIST =====

export type ProductListItemDto = {
  id: string;
  name: string;
  type: ProductTypeDto;
  status: ProductStatusDto;

  category?: string | null;
  brand?: string | null;
};

export type ProductSearchResponseDto = {
  items: ProductListItemDto[];
  total: number;
  page: number;
  limit: number;
};

// ===== DETAILS =====

export type ProductDetailsDto = {
  id: string;

  name: string;
  nameEn: string;

  barcode?: string | null;
  notes?: string | null;
  isVerified: boolean;
  source?: string | null;

  type: ProductTypeDto;
  unit: string;
  rawOrCooked: string;

  status: ProductStatusDto;

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
    type: string;
    isPrimary?: boolean;
  }>;
};
