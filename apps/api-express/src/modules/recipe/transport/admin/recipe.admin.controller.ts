import { Request, Response } from "express";
import { createRecipe } from "../../application/recipe.service";
import { createRecipeSchema } from "./schemas/create-recipe.schema";

export async function createRecipeAdminHandler(req: Request, res: Response) {
  try {
    const parsed = createRecipeSchema.parse(req.body);

    const recipe = await createRecipe(parsed);

    res.json({ id: recipe.id });
  } catch (e) {
    res.status(400).json({ message: "Failed to create recipe" });
  }
}
