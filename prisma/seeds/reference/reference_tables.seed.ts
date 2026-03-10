import { PrismaClient } from "@prisma/client";
import { seedBrands } from "./brands.seed";
import { seedCategories } from "./categories.seed";
import { seedCuisines } from "./cuisines.seed";
import { seedDietaryTags } from "./dietary_tags.seed";
import { seedMealTypes } from "./meal_types.seed";
import { seedNutrients } from "./nutrients.seed";
import { seedRecipeTypes } from "./recipe_types.seed";

export async function seedReferenceTables(prisma: PrismaClient) {
  await seedCategories(prisma);
  console.log("✓ Categories seeded");

  await seedNutrients(prisma);
  console.log("✓ Nutrients seeded");

  await seedBrands(prisma);
  console.log("✓ Brands seeded");

  await seedCuisines(prisma);
  console.log("✓ Cuisines seeded");

  await seedDietaryTags(prisma);
  console.log("✓ DietaryTags seeded");

  await seedMealTypes(prisma);
  console.log("✓ MealTypes seeded");

  await seedRecipeTypes(prisma);
  console.log("✓ RecipeTypes seeded");
}
