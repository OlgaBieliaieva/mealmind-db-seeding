import { Request, Response, NextFunction } from "express";
import { RecipeService } from "../../application/recipe.service";
import { mapRecipeClientSearchQuery } from "./mappers/map-recipe-client-search-query";
import { presentRecipeListItemInSearchClient } from "./presenters/recipe-search.client.presenter";
import { RequestWithContext } from "../../../../shared/types/request-with-context";

export class RecipeClientController {
  constructor(private service: RecipeService) {}

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = mapRecipeClientSearchQuery(req.query);

      const result = await this.service.searchRecipesClient(query);

      res.json({
        ...result,
        items: result.items.map(presentRecipeListItemInSearchClient),
      });
    } catch (e) {
      next(e);
    }
  };

  cookbook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryBase = mapRecipeClientSearchQuery(req.query);

      const { familyId } = (req as RequestWithContext).context;

      const result = await this.service.getCookbookRecipes({
        ...queryBase,
        familyId,
      });

      res.json({
        ...result,
        items: result.items.map(presentRecipeListItemInSearchClient),
      });
    } catch (e) {
      next(e);
    }
  };
}
