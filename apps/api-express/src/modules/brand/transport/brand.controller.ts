import { Request, Response, NextFunction } from "express";
import { BrandService } from "../application/brand.service";

export class BrandController {
  constructor(private service: BrandService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brands = await this.service.getAll();
      res.json(brands);
    } catch (e) {
      next(e);
    }
  };
}