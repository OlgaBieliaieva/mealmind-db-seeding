import { Request, Response, NextFunction } from "express";
import { RecipeAuthorService } from "../application/recipe-author.service";

export class RecipeAuthorController {
  constructor(private service: RecipeAuthorService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authors = await this.service.getAll();

      res.json(
        authors.map((a) => ({
          id: a.id,
          display_name: a.displayName,
          type: a.type,
          avatar_url: a.avatarUrl,
          profile_url: a.profileUrl,
        })),
      );
    } catch (e) {
      next(e);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const author = await this.service.create(req.body);

      res.status(201).json({
        id: author.id,
        display_name: author.displayName,
        type: author.type,
        avatar_url: author.avatarUrl,
        profile_url: author.profileUrl,
      });
    } catch (e) {
      next(e);
    }
  };
}
