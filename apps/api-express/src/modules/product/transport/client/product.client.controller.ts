import { Request, Response, NextFunction } from "express";
import { ProductService } from "../../application/product.service";
import { presentProductListItemInSearchClient } from "./presenters/product-search.client.presenter";
import { ProductClientSearchQuery } from "./schemas/product-client-search.query.schema";
import { RequestWithContext } from "../../../../shared/types/request-with-context";
import { RecipeIdParams } from "../../../recipe/transport/admin/schemas/recipe-id.params.schema";

export class ProductClientController {
  constructor(private service: ProductService) {}

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { familyId, userId } = (req as RequestWithContext).context;
      const raw = req.query as unknown as ProductClientSearchQuery;
      const query = {
        ...raw,
        page: Number(raw.page ?? 1),
        limit: Number(raw.limit ?? 20),
      };
      const result = await this.service.searchProductsClient({
        ...query,
        familyId,
        userId,
      });

      res.json({
        ...result,
        items: result.items.map(presentProductListItemInSearchClient),
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
}
