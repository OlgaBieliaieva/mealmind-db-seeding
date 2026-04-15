import { Prisma } from "@prisma/client";

export type RecipePersistenceAggregate = Prisma.RecipeGetPayload<{
  include: {
    recipeType: true;

    ingredients: {
      include: {
        product: {
          include: {
            brand: true;
            nutrients: true;
          };
        };
      };
    };

    steps: true;

    cuisines: {
      include: {
        cuisine: true;
      };
    };

    dietaryTags: {
      include: {
        dietaryTag: true;
      };
    };

    author: true;

    videos: {
      include: {
        author: true;
      };
    };

    nutrients: true;
  };
}>;
