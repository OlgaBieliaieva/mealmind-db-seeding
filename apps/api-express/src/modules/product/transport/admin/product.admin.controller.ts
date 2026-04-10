import { Request, Response, NextFunction } from "express";
import { ProductService } from "../../application/product.service";
import { ProductIdParams } from "../shared/schemas/product-id.params.schema";
import { AdminUpdateProductParams } from "./schemas/product.update.params.schema";
import { AdminUpdateProductInput } from "./schemas/product.update.schema";
import { mapProductSearchQuery } from "../shared/mappers/map-product-search-query";
import { ProductPhotoParams } from "./schemas/product-photo.params";
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

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as AdminUpdateProductParams;

      const body = req.body as AdminUpdateProductInput;

      await this.service.update(id, body);

      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = mapProductSearchQuery(req.query);

      const result = await this.service.searchProducts(query);

      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as ProductIdParams;
      await this.service.activateProduct(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };

  archive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as ProductIdParams;
      await this.service.archiveProduct(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };

  restore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as ProductIdParams;
      await this.service.restoreProduct(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };

  hardDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as ProductIdParams;
      await this.service.deleteHardProduct(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };

  deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, photoId } = req.params as ProductPhotoParams;

      await this.service.removePhoto(id, photoId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };

  getNutrientsBatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { product_ids } = req.body as { product_ids: string[] };

      const result = await this.service.getProductsNutrients(product_ids);

      res.json(result);
    } catch (e) {
      next(e);
    }
  };
}
