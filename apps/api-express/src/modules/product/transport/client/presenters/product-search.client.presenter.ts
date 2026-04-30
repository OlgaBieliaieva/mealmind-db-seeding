type ProductListItem = {
  id: string;
  nameUa: string;

  brand?: {
    nameUa: string;
    nameEn: string;
    country?: string | null;
  } | null;

  category: {
    nameUa: string;
    nameEn: string;
  };

  photos?: { url: string }[];

  nutrients: {
    nutrient: {
      code: string;
    };
    valuePer100g: number;
  }[];
};

function mapProductMacros(nutrients: ProductListItem["nutrients"]) {
  let calories: number | undefined = 0;
  let proteins: number | undefined = 0;
  let fats: number | undefined = 0;
  let carbs: number | undefined = 0;

  for (const n of nutrients) {
    switch (n.nutrient.code) {
      case "energy_kcal":
        calories = n.valuePer100g;
        break;
      case "protein":
        proteins = n.valuePer100g;
        break;
      case "fat":
        fats = n.valuePer100g;
        break;
      case "carbohydrates":
        carbs = n.valuePer100g;
        break;
    }
  }

  return { calories, proteins, fats, carbs };
}

export function presentProductListItemInSearchClient(product: ProductListItem) {
  const { calories, proteins, fats, carbs } = mapProductMacros(
    product.nutrients,
  );

  return {
    id: product.id,
    type: "product",

    name: product.nameUa,
    photoUrl: product.photos?.[0]?.url,

    categoryName: product.category.nameUa,
    categoryCode: normalizeCategoryCode(product.category.nameEn),

    brand: product.brand
      ? {
          name: getBrandName(product.brand),
          country: product.brand.country,
        }
      : null,

    calories,
    proteins,
    fats,
    carbs,

    isFavorite: false,
  };
}

function isUkrainianBrand(country?: string | null): boolean {
  if (!country) return false;

  const normalized = country.toLowerCase();

  return (
    normalized === "ua" || normalized === "ukraine" || normalized === "україна"
  );
}

function getBrandName(brand: {
  nameUa: string;
  nameEn: string;
  country?: string | null;
}) {
  return isUkrainianBrand(brand.country) ? brand.nameUa : brand.nameEn;
}

function normalizeCategoryCode(nameEn: string): string {
  return nameEn
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}
