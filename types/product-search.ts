export type ProductSearchItem = {
  product_id: string;
  name_ua: string;
  product_type: "generic" | "branded";
  brand_name_ua?: string;
};
