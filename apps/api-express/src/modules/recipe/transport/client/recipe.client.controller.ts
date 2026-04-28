// recipe.client.controller.ts
import { Request, Response, NextFunction } from "express";
import { RecipeService } from "../../application/recipe.service";
import { mapRecipeClientSearchQuery } from "./mappers/map-recipe-client-search-query";
import { presentRecipeListItemClient } from "./presenters/recipe.client.presenter";

export class RecipeClientController {
  constructor(private service: RecipeService) {}

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = mapRecipeClientSearchQuery(req.query);

      const result = await this.service.searchRecipesClient(query);

      res.json({
        ...result,
        items: result.items.map(presentRecipeListItemClient),
      });
    } catch (e) {
      next(e);
    }
  };
}
