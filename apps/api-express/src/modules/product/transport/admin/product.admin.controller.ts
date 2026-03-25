import { Request, Response, NextFunction } from "express";
import { ProductService } from "../../application/product.service";
import { ProductIdParams } from "../shared/schemas/product-id.params.schema";
import { presentProductDetailsAdmin } from "./presenters/product.admin.presenter";

export class ProductAdminController {
  constructor(private service: ProductService) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.service.create(req.body);

      res.status(201).json({
        product_id: created.id,
      });
    } catch (err) {
      next(err);
    }
  };
  getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as ProductIdParams;

      const product = await this.service.getDetails(id);

      res.json(presentProductDetailsAdmin(product));
    } catch (err) {
      next(err);
    }
  };
}
