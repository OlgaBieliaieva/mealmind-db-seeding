type ProductListItem = {
  id: string;
  nameUa: string;
  unit: string;
  photos?: { url: string }[];
};

export type ProductListItemClientDTO = {
  id: string;
  type: "product";
  name: string;
  photoUrl?: string;
  unit: string;
};

export function presentProductListItemInMealPlanClient(
  product: ProductListItem,
): ProductListItemClientDTO {
  return {
    id: product.id,
    type: "product",
    name: product.nameUa,
    photoUrl: product.photos?.[0]?.url,
    unit: product.unit,
  };
}
