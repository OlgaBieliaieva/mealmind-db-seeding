import { Request, Response, NextFunction } from "express";
import { ProductService } from "../../application/product.service";
import { presentProductListItemClient } from "./presenters/product.client.presenter";
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
        items: result.items.map(presentProductListItemClient),
      });
    } catch (e) {
      next(e);
    }
  };
}

// import { Request, Response, NextFunction } from "express";
// import { ProductService } from "../../application/product.service";
// import { presentProductListItemClient } from "./presenters/product.client.presenter";
// import { ProductClientSearchQuery } from "./schemas/product-client-search.query.schema";

// type SearchRequest = Request<
//   Record<string, never>,
//   Record<string, never>,
//   Record<string, never>,
//   ProductClientSearchQuery
// >;

// export class ProductClientController {
//   constructor(private service: ProductService) {}

//   search = async (req: SearchRequest, res: Response, next: NextFunction) => {
//     try {
//       const result = await this.service.searchProductsClient(req.query);

//       res.json({
//         ...result,
//         items: result.items.map(presentProductListItemClient),
//       });
//     } catch (e) {
//       next(e);
//     }
//   };
// }
