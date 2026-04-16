import { RecipePersistenceAggregate } from "../../../domain/persistence/recipe.prisma.types";

export function presentRecipeDetails(recipe: RecipePersistenceAggregate) {
  return {
    recipe: {
      recipe_id: recipe.id,
      title: recipe.title,
      description: recipe.description ?? "",

      status: recipe.status,
      visibility: recipe.visibility,

      photo_url: recipe.photoUrl ?? null,

      recipe_type_id: recipe.recipeTypeId ?? null,
      recipe_type_name: recipe.recipeType?.nameUa ?? null,

      difficulty: recipe.difficulty ?? null,
      prep_time_min: recipe.prepTimeMin ?? null,
      cook_time_min: recipe.cookTimeMin ?? null,

      base_servings: recipe.baseServings,
      base_output_weight_g: recipe.baseOutputWeightG,

      recipe_author_id: recipe.recipeAuthorId ?? null,
    },

    ingredients: recipe.ingredients.map((i) => ({
      id: i.id,
      product_id: i.productId,
      product_name: i.product.nameUa,
      brand_name: i.product.brand
        ? i.product.brand.country?.toLocaleLowerCase() === "україна"
          ? i.product.brand.nameUa
          : i.product.brand.nameEn
        : null,
      quantity_g: i.quantityG,
      is_optional: i.isOptional,
      order: i.orderIndex,
    })),

    steps: recipe.steps.map((s) => ({
      id: s.id,
      order: s.stepNumber,
      text: s.instruction,
    })),

    cuisines: recipe.cuisines.map((c) => ({
      cuisine_id: c.cuisine.id,
      name: c.cuisine.nameUa,
    })),

    dietary_tags: recipe.dietaryTags.map((d) => ({
      dietary_tag_id: d.dietaryTag.id,
      name: d.dietaryTag.nameUa,
    })),

    author: recipe.author
      ? {
          recipe_author_id: recipe.author.id,
          display_name: recipe.author.displayName,
          type: recipe.author.type,
          avatar_url: recipe.author.avatarUrl ?? null,
          profile_url: recipe.author.profileUrl ?? null,
        }
      : null,

    videos: recipe.videos.map((v) => ({
      recipe_video_id: v.id,
      platform: v.platform,
      url: v.url,
      author: v.author
        ? {
            recipe_author_id: v.author.id,
            display_name: v.author.displayName,
            profile_url: v.author.profileUrl ?? null,
          }
        : null,
    })),

    nutrients: Object.fromEntries(
      recipe.nutrients.map((n) => [
        n.nutrientId,
        {
          value: n.valueTotal,
          unit: n.unit,
        },
      ]),
    ),
  };
}
