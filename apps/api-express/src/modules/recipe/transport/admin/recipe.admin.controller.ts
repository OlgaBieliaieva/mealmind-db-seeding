import { Request, Response, NextFunction } from "express";
import { RecipeService } from "../../application/recipe.service";
import { presentRecipeDetails } from "./presenters/recipe.admin.presenter";
import { mapRecipeSearchQuery } from "../shared/mappers/map-recipe-search-query";
import { RecipeIdParams } from "./schemas/recipe-id.params.schema";

export class RecipeAdminController {
  constructor(private service: RecipeService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe = await this.service.create(req.body);

      res.status(201).json({
        recipe_id: recipe.id,
      });
    } catch (err) {
      next(err);
    }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = mapRecipeSearchQuery(req.query);

      const result = await this.service.searchRecipes(query);

      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as RecipeIdParams;

      const recipe = await this.service.getDetails(id);

      res.json(presentRecipeDetails(recipe));
    } catch (err) {
      next(err);
    }
  };

  deleteHard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as RecipeIdParams;

      await this.service.deleteHard(id);

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}
