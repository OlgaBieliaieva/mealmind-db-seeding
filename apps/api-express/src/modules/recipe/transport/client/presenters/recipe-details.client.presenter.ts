import { mapToUINutrientGroup } from "../../../../nutrient/transport/client/mappers/nutrient-ui-map";

type RecipeDetailsAggregate = {
  id: string;
  title: string;
  description?: string | null;
  fullDescription?: string | null;
  photoUrl?: string | null;

  prepTimeMin?: number | null;
  cookTimeMin?: number | null;
  difficulty?: "easy" | "medium" | "hard" | null;

  baseOutputWeightG: number;
  baseServings?: number | null;

  recipeType?: {
    code: string;
    nameUa: string;
    nameEn: string;
  } | null;

  author?: {
    displayName: string;
    bio: string | null;
    avatarUrl?: string | null;
    profileUrl?: string | null;
    links?: {
      type: string;
      url: string;
    }[];
  } | null;

  cuisines: {
    cuisine: {
      id: string;
      nameUa: string;
    };
  }[];

  ingredients: {
    id: string;
    quantityG: number;
    isOptional: boolean;
    orderIndex: number;
    product: {
      id: string;
      nameUa: string;
      unit: string;
      brand?: {
        nameUa: string;
        nameEn: string;
        country?: string | null;
      } | null;
      category: { nameEn: string; nameUa: string };
    };
  }[];

  steps: {
    id: string;
    stepNumber: number;
    instruction: string;
    timerSec?: number | null;
  }[];

  nutrients: {
    nutrient: {
      code: string;
      nameUa: string;
      nutrientGroup: string;
      sortOrder: number;
    };
    valueTotal: number;
    unit: string;
  }[];

  favorites?: { id: string }[];

  videos: {
    id: string;
    title?: string | null;
    thumbnailUrl?: string | null;
    durationSec?: number | null;
    platform: string;
    url: string;
    author?: {
      displayName: string;
    } | null;
  }[];
};

export function presentRecipeDetails(recipe: RecipeDetailsAggregate) {
  const macros = mapMacros(recipe.nutrients, recipe.baseOutputWeightG);

  return {
    id: recipe.id,

    name: recipe.title,
    description: recipe.description,
    fullDescription: recipe.fullDescription,
    photoUrl: recipe.photoUrl ?? undefined,

    prepTime: recipe.prepTimeMin,
    cookTime: recipe.cookTimeMin,
    totalTime: (recipe.prepTimeMin ?? 0) + (recipe.cookTimeMin ?? 0),
    baseServings: recipe.baseServings,
    baseServingWeightG:
      recipe.baseServings && recipe.baseServings > 0
        ? recipe.baseOutputWeightG / recipe.baseServings
        : 0,

    baseOutputWeightG: recipe.baseOutputWeightG,
    difficulty: recipe.difficulty ?? undefined,

    categoryCode: recipe.recipeType?.code,
    categoryName: recipe.recipeType?.nameUa,

    author: recipe.author
      ? {
          name: recipe.author.displayName,
          bio: recipe.author.bio ?? undefined,
          avatarUrl: recipe.author.avatarUrl ?? undefined,
          profileUrl: recipe.author.profileUrl ?? undefined,
          links: recipe.author.links?.map((l) => ({
            type: l.type,
            url: l.url,
          })),
        }
      : undefined,

    cuisines: recipe.cuisines.map((c) => ({
      id: c.cuisine.id,
      name: c.cuisine.nameUa,
    })),

    ingredients: recipe.ingredients
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((i) => ({
        id: i.id,
        productId: i.product.id,
        name: i.product.nameUa,
        quantity: i.quantityG,
        unit: "г", // 🔥 поки просто g
        isOptional: i.isOptional,
        category: {
          name: i.product.category.nameUa,
          code: normalizeCategoryCode(i.product.category.nameEn),
        },
        brand: i.product.brand
          ? {
              name: getBrandName(i.product.brand),
              country: i.product.brand.country ?? undefined,
            }
          : undefined,
      })),

    steps: recipe.steps
      .sort((a, b) => a.stepNumber - b.stepNumber)
      .map((s) => ({
        id: s.id,
        stepNumber: s.stepNumber,
        instruction: s.instruction,
        timerSec: s.timerSec ?? undefined,
      })),

    nutrients: recipe.nutrients.map((n) => ({
      code: n.nutrient.code,
      name: n.nutrient.nameUa,
      value:
        recipe.baseOutputWeightG > 0
          ? (n.valueTotal / recipe.baseOutputWeightG) * 100
          : 0,
      unit: n.unit ?? "g",
      group: n.nutrient.nutrientGroup,
      uiGroup: mapToUINutrientGroup(n.nutrient.code, n.nutrient.nutrientGroup),
      sortOrder: n.nutrient.sortOrder,
    })),

    macros,

    isFavorite: (recipe.favorites?.length ?? 0) > 0,

    videos: recipe.videos?.map((v) => ({
      id: v.id,
      title: v.title ?? undefined,
      thumbnailUrl: v.thumbnailUrl ?? undefined,
      durationSec: v.durationSec ?? undefined,
      platform: v.platform,
      url: v.url,

      author: v.author
        ? {
            name: v.author.displayName,
          }
        : undefined,
    })),
  };
}

function mapMacros(
  nutrients: RecipeDetailsAggregate["nutrients"],
  totalWeight: number,
) {
  let calories = 0;
  let proteins = 0;
  let fats = 0;
  let carbs = 0;

  if (!totalWeight || totalWeight === 0) {
    return { calories, proteins, fats, carbs };
  }

  for (const n of nutrients) {
    const per100g = (n.valueTotal / totalWeight) * 100;

    switch (n.nutrient.code) {
      case "energy_kcal":
        calories = per100g;
        break;
      case "protein":
        proteins = per100g;
        break;
      case "fat":
        fats = per100g;
        break;
      case "carbohydrates":
        carbs = per100g;
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
