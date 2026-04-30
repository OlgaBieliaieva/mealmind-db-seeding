import { Request, Response, NextFunction } from "express";
import { ProductService } from "../../application/product.service";
import { presentProductListItemInSearchClient } from "./presenters/product-search.client.presenter";
import { ProductClientSearchQuery } from "./schemas/product-client-search.query.schema";

export class ProductClientController {
  constructor(private service: ProductService) {}

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const raw = req.query as unknown as ProductClientSearchQuery;
      const query = {
        ...raw,
        page: Number(raw.page ?? 1),
        limit: Number(raw.limit ?? 20),
      };
      const result = await this.service.searchProductsClient(query);

      res.json({
        ...result,
        items: result.items.map(presentProductListItemInSearchClient),
      });
    } catch (e) {
      next(e);
    }
  };
}
