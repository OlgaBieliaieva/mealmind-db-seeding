export type GenericProductListItem = {
  product_id: number | string;
  name: {
    en: string;
    ua: string;
  };
  category_id: number;
  unit: string;
};
