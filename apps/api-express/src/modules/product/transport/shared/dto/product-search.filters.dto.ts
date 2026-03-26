export type ProductSearchFilters = {
  query?: string;
  type?: "generic" | "branded";
  categoryId?: string;
  brandId?: string;
  page?: number;
  limit?: number;
};
