import { readSheet } from "@/lib/sheets.read";
import { RecipeIngredientView } from "@/types/recipe-ingredient";
import { RecipeStepDraft } from "@/types/recipe-step";
import { RecipeFull } from "@/types/recipe-views";
import { parseSheetBoolean } from "@/lib/utils/sheetBoolean";

export async function getRecipeById(
  recipeId: string,
): Promise<RecipeFull | null> {
  if (!recipeId) return null;

  // ===============================
  // 1️⃣ Recipe
  // ===============================
  const recipeRows = await readSheet("recipes!A2:R");
  const recipeRow = recipeRows.find((r) => r[0] === recipeId);

  if (!recipeRow) return null;

  const recipe = {
    recipe_id: recipeRow[0],
    title: recipeRow[1],
    description: recipeRow[2],
    status: recipeRow[8] as RecipeFull["recipe"]["status"],
    visibility: recipeRow[6] as RecipeFull["recipe"]["visibility"],
    photo_url: recipeRow[15] || null,
  };

  // ===============================
  // 2️⃣ Products + Brands (JOIN DATA)
  // ===============================
  const productRows = await readSheet("products!A2:Z");
  const brandRows = await readSheet("brands!A2:Z");

  const productsMap = Object.fromEntries(
    productRows.map((row) => [
      row[0], // product_id
      {
        name: row[2] || row[1], // name_ua fallback name_en
        brand_id: row[4] || null,
      },
    ]),
  );

  const brandsMap = Object.fromEntries(
    brandRows.map((row) => [
      row[0], // brand_id
      row[2] || row[1], // name_ua fallback name_en
    ]),
  );

  // ===============================
  // 3️⃣ Ingredients (ENRICHED)
  // ===============================
  const ingredientRows = await readSheet("recipe_ingredients!A2:Z");

  const ingredients: RecipeIngredientView[] = ingredientRows
    .filter((row) => row[1] === recipeId)
    .map((row) => {
      const product = productsMap[row[2]];

      return {
        id: row[0],
        product_id: row[2],
        product_name: product?.name ?? "Unknown product",
        brand_name: product?.brand_id
          ? (brandsMap[product.brand_id] ?? null)
          : null,
        quantity_g: Number(row[3]) || 0,
        is_optional: parseSheetBoolean(row[4]),
        order: Number(row[5]) || 0,
      };
    })
    .sort((a, b) => a.order - b.order);

  // ===============================
  // 4️⃣ Steps
  // ===============================
  const stepRows = await readSheet("recipe_steps!A2:Z");

  const steps: RecipeStepDraft[] = stepRows
    .filter((row) => row[1] === recipeId)
    .map((row) => ({
      id: row[0],
      order: Number(row[2]),
      text: row[3],
    }))
    .sort((a, b) => a.order - b.order);

  // ===============================
  // 5️⃣ Cuisines
  // ===============================
  const cuisineRows = await readSheet("recipe_cuisines!A2:C");
  const cuisinesRef = await readSheet("cuisines!A2:Z");

  const cuisinesMap = Object.fromEntries(
    cuisinesRef.map((row) => [Number(row[0]), row[3] || row[2]]),
  );

  const cuisines = cuisineRows
    .filter((row) => row[0] === recipeId)
    .map((row) => ({
      cuisine_id: Number(row[1]),
      name: cuisinesMap[Number(row[1])] ?? "Unknown",
    }));

  // ===============================
  // 5️⃣ Dietary tags
  // ===============================
  const dietaryRows = await readSheet("recipe_dietary_tags!A2:C");
  const dietaryRef = await readSheet("dietary_tags!A2:Z");

  const dietaryMap = Object.fromEntries(
    dietaryRef.map((row) => [Number(row[0]), row[3] || row[2]]),
  );

  const dietary_tags = dietaryRows
    .filter((row) => row[0] === recipeId)
    .map((row) => ({
      dietary_tag_id: Number(row[1]),
      name: dietaryMap[Number(row[1])] ?? "Unknown",
    }));

  // ===============================
  // 5️⃣ Author links
  // ===============================
  const authorRows = await readSheet("author_links!A2:D");

  const authors = authorRows
    .filter((row) => row[1] === recipeId)
    .map((row) => ({
      platform: row[2],
      url: row[3],
    }));
  return {
    recipe,
    ingredients,
    steps,
    cuisines,
    dietary_tags,
    authors,
  };
}
