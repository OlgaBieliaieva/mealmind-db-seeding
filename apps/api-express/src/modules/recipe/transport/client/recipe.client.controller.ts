import { Request, Response, NextFunction } from "express";
import { RecipeService } from "../../application/recipe.service";
import { mapRecipeClientSearchQuery } from "./mappers/map-recipe-client-search-query";
import { presentRecipeListItemInSearchClient } from "./presenters/recipe-search.client.presenter";
import { RequestWithContext } from "../../../../shared/types/request-with-context";
import { RecipeIdParams } from "../admin/schemas/recipe-id.params.schema";
import { presentRecipeDetails } from "./presenters/recipe-details.client.presenter";

export class RecipeClientController {
  constructor(private service: RecipeService) {}

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { familyId, userId } = (req as RequestWithContext).context;
      const query = mapRecipeClientSearchQuery(req.query);

      const result = await this.service.searchRecipesClient({
        ...query,
        familyId,
        userId,
      });

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

      const { familyId, userId } = (req as RequestWithContext).context;

      const result = await this.service.getCookbookRecipes({
        ...queryBase,
        familyId,
        userId,
      });

      res.json({
        ...result,
        items: result.items.map(presentRecipeListItemInSearchClient),
      });
    } catch (e) {
      next(e);
    }
  };

  toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as RecipeIdParams;
      const { familyId, userId } = (req as RequestWithContext).context;

      const isFavorite = await this.service.toggleFavorite(
        id,
        familyId,
        userId,
      );

      res.json({ isFavorite });
    } catch (e) {
      next(e);
    }
  };

  getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as RecipeIdParams;
      const { familyId, userId } = (req as RequestWithContext).context;

      const recipe = await this.service.getRecipeDetails(id, {
        familyId,
        userId,
      });

      res.json(presentRecipeDetails(recipe));
    } catch (e) {
      next(e);
    }
  };
}
