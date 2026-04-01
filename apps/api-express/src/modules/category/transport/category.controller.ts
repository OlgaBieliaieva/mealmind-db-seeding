import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../application/category.service";

export class CategoryController {
  constructor(private service: CategoryService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.service.getAll();

      res.json(categories);
    } catch (e) {
      next(e);
    }
  };
}
