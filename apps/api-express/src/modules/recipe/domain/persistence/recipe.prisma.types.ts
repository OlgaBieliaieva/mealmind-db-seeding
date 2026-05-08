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
            category: true;
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

    author: {
      include: {
        links: true;
      };
    };

    videos: {
      include: {
        author: {
          include: {
            links: true;
          };
        };
      };
    };

    sources: true;

    originalRecipe: {
      select: {
        id: true;
        title: true;
        photoUrl: true;
      };
    };

    nutrients: {
      include: {
        nutrient: true;
      };
    };

    favorites: true;
  };
}>;
