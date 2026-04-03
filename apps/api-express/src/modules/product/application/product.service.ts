import { Prisma } from "@prisma/client";

import { ProductRepository } from "../domain/product.repository";
import { ProductSearchQuery } from "../domain/queries/product-search.query";
import { ProductValidationQuery } from "../domain/queries/product-validation.query";
import {
  BadRequestError,
  NotFoundError,
} from "../../../shared/errors/http-errors";
import { presentProductListItem } from "../transport/admin/presenters/product.admin.presenter";

import { AdminCreateProductInput } from "../transport/admin/schemas/product.create.schema";
import { AdminUpdateProductInput } from "../transport/admin/schemas/product.update.schema";
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

    if (input.is_verified) {
      await this.repo.activate(created.id);
    }
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

  async activateProduct(id: string) {
    const product = await this.repo.findByIdDetailed(id);

    if (!product) throw new Error("Product not found");

    if (product.status === "active") return;

    await this.repo.activate(id);
  }

  async archiveProduct(id: string) {
    const product = await this.repo.findByIdDetailed(id);

    if (!product) throw new Error("Product not found");

    if (product.status === "archived") return;

    // ⭐ IMPORTANT BUSINESS RULE
    if (product.type === "generic") {
      await this.repo.detachChildren(product.id);
    }

    await this.repo.archive(id);
  }

  async restoreProduct(id: string) {
    const product = await this.repo.findByIdDetailed(id);

    if (!product) throw new Error("Product not found");

    if (product.status !== "archived") {
      throw new Error("Only archived product can be restored");
    }

    await this.repo.restore(id);
  }

  async update(id: string, input: AdminUpdateProductInput) {
    const existing = await this.repo.findByIdDetailed(id);

    if (!existing) {
      throw new Error("Product not found");
    }

    // ⭐ CATEGORY RULE

    if (existing.parentProductId && input.category_id !== undefined) {
      throw new Error("Cannot change category for inherited product");
    }

    // ⭐ BRAND RULE

    if (existing.type === "generic" && input.brand_id !== undefined) {
      throw new Error("Generic product cannot have brand");
    }

    if (existing.type === "branded") {
      if (input.brand_id === null) {
        throw new Error("Brand cannot be removed");
      }

      if (input.brand_id) {
        const exists = await this.validationQuery.brandExists(input.brand_id);
        if (!exists) throw new Error("Brand not found");
      }
    }

    const { nutrients, photos, ...rest } = input;

    await this.repo.updatePartial(id, rest);

    // ⭐ nutrients snapshot replace

    if (nutrients !== undefined) {
      await this.repo.replaceNutrients(id, nutrients);
    }

    // ⭐ media mutation

    if (photos?.add?.length) {
      const finalized = await finalizeProductPhotos(id, photos.add);

      await this.repo.attachPhotos(id, finalized);

      Promise.all(
        finalized.map((p) => generateProductPhotoVariants(id, p.objectName)),
      );
    }

    if (photos?.remove?.length) {
      await this.repo.deletePhotos(photos.remove);
    }
  }

  async deleteHardProduct(id: string) {
    const product = await this.repo.findByIdDetailed(id);

    if (!product)
      throw new NotFoundError("PRODUCT_NOT_FOUND", "Product not found");

    if (product.status !== "archived") {
      throw new BadRequestError(
        "ONLY_ARCHIVED_CAN_DELETE",
        "Product must be archived before deletion",
      );
    }

    // TODO later
    // check recipe usage
    // check plan usage

    await this.repo.deleteHard(id);
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
      {
        includeArchived: true,
      },
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

  async removePhoto(productId: string, photoId: string) {
    await this.repo.removePhoto(productId, photoId);
  }
}
