import { presentNutrient } from "../../../../nutrient/transport/client/presenters/nutrient.client.presenter";

type ProductDetailsAggregate = {
  id: string;

  nameUa: string;
  nameEn: string;

  category: {
    nameUa: string;
    nameEn: string;
  };

  brand?: {
    nameUa: string;
    nameEn: string;
    country?: string | null;
  } | null;

  photos?: {
    url: string;
    photoType: string;
  }[];

  nutrients: {
    nutrient: {
      code: string;
      nameUa: string;
      nameEn: string;
      nutrientGroup: string;
      sortOrder: number;
    };
    valuePer100g: number;
    unit?: string | null;
  }[];

  favorites?: { id: string }[];
};

export function presentProductDetails(product: ProductDetailsAggregate) {
  const macros = mapMacros(product.nutrients);

  return {
    id: product.id,

    name: product.nameUa,

    photoUrl: pickPrimaryPhoto(product.photos),

    categoryName: product.category.nameUa,
    categoryCode: normalizeCategoryCode(product.category.nameEn),

    brand: product.brand
      ? {
          name: getBrandName(product.brand),
          country: product.brand.country ?? undefined,
        }
      : undefined,

    nutrients: product.nutrients.map(presentNutrient),

    macros,

    isFavorite: (product.favorites?.length ?? 0) > 0,
  };
}

function mapMacros(nutrients: ProductDetailsAggregate["nutrients"]) {
  let calories = 0;
  let proteins = 0;
  let fats = 0;
  let carbs = 0;

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

function isUkrainianBrand(country?: string | null) {
  if (!country) return false;

  const c = country.toLowerCase();

  return c === "ua" || c === "ukraine" || c === "україна";
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

function pickPrimaryPhoto(
  photos?: { url: string; photoType: string }[],
): string | undefined {
  if (!photos || photos.length === 0) return undefined;

  const packaging = photos.find((p) => p.photoType === "packaging");

  if (packaging) return packaging.url;

  return photos[0].url;
}
