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
