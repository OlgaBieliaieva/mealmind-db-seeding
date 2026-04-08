import { Request, Response, NextFunction } from "express";
import { CuisineService } from "../../application/cuisine.service";
import { presentCuisineList } from "./cuisine.presenter";

export class CuisineAdminController {
  constructor(private service: CuisineService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cuisines = await this.service.getAll();

      res.json(presentCuisineList(cuisines));
    } catch (e) {
      next(e);
    }
  };
}
