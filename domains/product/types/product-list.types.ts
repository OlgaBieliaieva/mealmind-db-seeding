export type ProductListItem = {
  product_id: string;

  name_en: string;
  name_ua: string;

  type: "generic" | "branded";

  category?: string;
  brand?: string;

  is_verified: boolean;
};

export type ProductListResponse = {
  items: ProductListItem[];

  total: number;
  page: number;
  limit: number;
};

export type ProductListItemDto = {
  product_id: string;
  name_ua: string;
  type: "generic" | "branded";
  brand?: string | null;
};
