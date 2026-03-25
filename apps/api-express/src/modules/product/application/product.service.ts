import { Prisma } from "@prisma/client";

import { ProductRepository } from "../domain/product.repository";
import { ProductSearchQuery } from "../domain/queries/product-search.query";
import { ProductValidationQuery } from "../domain/queries/product-validation.query";

import { presentProductListItem } from "../transport/admin/presenters/product.admin.presenter";

import { AdminCreateProductInput} from "../transport/admin/schemas/product.create.schema";
import { ProductSearchFilters } from "../transport/shared/dto/product-search.filters.dto";

import { finalizeProductPhotos } from "../domain/product-media.service";
import { generateProductPhotoVariants } from "../../product-media/product-media.worker";

import { TempProductPhoto } from "../../product-media/types/product-media.types";

export class ProductService {
  constructor(
    private repo: ProductRepository,
    private searchQuery: ProductSearchQuery,
    private validationQuery: ProductValidationQuery,
  ) {}

  async getDetails(id: string) {
    const product = await this.repo.findByIdDetailed(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async create(input: AdminCreateProductInput) {
    // ⭐ VALIDATION через query layer

    const categoryExists = await this.validationQuery.categoryExists(
      input.category_id,
    );

    if (!categoryExists) {
      throw new Error("Category not found");
    }

    if (input.type === "branded") {
      const brandExists = await this.validationQuery.brandExists(
        input.brand_id,
      );

      if (!brandExists) {
        throw new Error("Brand not found");
      }
    }

    // ⭐ MEDIA SPLIT

    const { photos, ...rest } = input;

    const created = await this.repo.create(rest);

    // ⭐ MEDIA LIFECYCLE

    if (photos?.length) {
      const validPhotos = photos.filter(
        (p): p is TempProductPhoto => !!p.objectName,
      );

      if (validPhotos.length) {
        const finalized = await finalizeProductPhotos(created.id, validPhotos);

        await this.repo.attachPhotos(created.id, finalized);

        Promise.all(
          finalized.map((p) =>
            generateProductPhotoVariants(created.id, p.objectName),
          ),
        );
      }
    }

    return created;
  }

  async update(id: string, input: AdminCreateProductInput) {
    await this.repo.update(id, input);
  }

  async delete(id: string) {
    await this.repo.delete(id);
  }

  async searchProducts(filters: ProductSearchFilters) {
    const { query, type, categoryId, brandId, page = 1, limit = 20 } = filters;

    const where: Prisma.ProductWhereInput = {};

    if (type) where.type = type;

    if (categoryId) {
      const ids = await this.searchQuery.loadCategorySubtreeIds(categoryId);
      where.categoryId = { in: ids };
    }

    if (brandId) where.brandId = brandId;

    if (query) {
      where.OR = [
        { nameEn: { contains: query, mode: "insensitive" } },
        { nameUa: { contains: query, mode: "insensitive" } },
      ];
    }

    const { items, total } = await this.searchQuery.searchProducts(
      where,
      page,
      limit,
    );

    return {
      items: items.map(presentProductListItem),
      total,
      page,
      limit,
    };
  }

  async genericSearch(query: string) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    return this.searchQuery.searchGeneric(query);
  }
}