import { Request, Response, NextFunction } from "express";
import { ProductClientService } from "../../application/product.client.service";
import { presentProductListItemInSearchClient } from "./presenters/product-search.client.presenter";
import { presentProductDetails } from "./presenters/product-details.client.presenter";
import { ProductClientSearchQuery } from "./schemas/product-client-search.query.schema";
import { RequestWithContext } from "../../../../shared/types/request-with-context";
import { RecipeIdParams } from "../../../recipe/transport/admin/schemas/recipe-id.params.schema";

export class ProductClientController {
  constructor(private service: ProductClientService) {}

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { familyId, userId } = (req as RequestWithContext).context;
      const raw = req.query as unknown as ProductClientSearchQuery;
      const query = {
        ...raw,
        page: Number(raw.page ?? 1),
        limit: Number(raw.limit ?? 20),
      };
      const result = await this.service.searchProducts({
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

  getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const { familyId } = (req as RequestWithContext).context;

      const product = await this.service.getProductDetails(id, {
        familyId,
      });

      res.json(presentProductDetails(product));
    } catch (e) {
      next(e);
    }
  };

  getProductRecipes = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params as { id: string };

      const { page = "1", limit = "20" } = req.query;

      const { familyId } = (req as RequestWithContext).context;

      const result = await this.service.getProductRecipes({
        productId: id,
        page: Number(page),
        limit: Number(limit),
        familyId,
      });

      res.json(result);
    } catch (e) {
      next(e);
    }
  };
}
