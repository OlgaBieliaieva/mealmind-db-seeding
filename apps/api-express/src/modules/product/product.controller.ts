import { Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service";
import { presentProductDetailsAdmin } from "./presenters/product.admin.presenter";

export class ProductController {
  constructor(private service: ProductService) {}

  getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idParam = req.params.id;

      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      const product = await this.service.getDetails(id);

      res.json(presentProductDetailsAdmin(product));
    } catch (err) {
      next(err);
    }
  };
}
