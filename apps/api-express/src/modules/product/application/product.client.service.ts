import { ProductRepository } from "../domain/product.repository";
import { ProductSearchQuery } from "../domain/queries/product-search.query";

import {
  BadRequestError,
  NotFoundError,
} from "../../../shared/errors/http-errors";

import { buildProductSearchWhere } from "../domain/queries/product-search.helper";
import { presentRecipeListItemInSearchClient } from "../../recipe/transport/client/presenters/recipe-search.client.presenter";

export class ProductClientService {
  constructor(
    private repo: ProductRepository,
    private searchQuery: ProductSearchQuery,
  ) {}

  async searchProducts(filters: {
    query?: string;
    page: number;
    limit: number;
    userId: string;
    familyId: string;
  }) {
    const { query, page, limit, userId, familyId } = filters;

    const where = buildProductSearchWhere({}, query);

    const { items, total } = await this.searchQuery.searchProducts(
      where,
      page,
      limit,
      { includeArchived: false },
      { familyId, userId },
    );

    return { items, total, page, limit };
  }

  async toggleFavorite(productId: string, familyId: string, userId: string) {
    return this.repo.toggleFavorite(productId, familyId, userId);
  }

  async getProductDetails(id: string, context: { familyId: string }) {
    const product = await this.repo.findByIdDetailed(id);

    if (!product) {
      throw new NotFoundError("PRODUCT_NOT_FOUND", "Product not found");
    }

    return product;
  }

  async getProductRecipes(params: {
    productId: string;
    page: number;
    limit: number;
    familyId: string;
  }) {
    const { items, total } =
      await this.searchQuery.searchRecipesByProduct(params);

    return {
      items: items.map(presentRecipeListItemInSearchClient),
      total,
      page: params.page,
      limit: params.limit,
    };
  }
}
