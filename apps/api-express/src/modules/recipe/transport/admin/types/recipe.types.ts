import { CreateRecipeDTO } from "../../../dto/create-recipe.dto";

export type RecipeIngredientInput = CreateRecipeDTO["ingredients"][number];

export type RecipeStepInput = CreateRecipeDTO["steps"][number];
