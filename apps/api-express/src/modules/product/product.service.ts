import { PrismaClient, Prisma } from "@prisma/client";
import { ProductRepository } from "./product.repository";
import { presentProductListItem } from "./presenters/product.admin.presenter";
import { ProductInput } from "./dto/product.input";
import { ProductSearchFilters } from "./types/product-search.types";
import { finalizeProductPhotos } from "../product-media/product-media.service";
import { generateProductPhotoVariants } from "../product-media/product-media.worker";
import { TempProductPhoto } from "../product-media/types/product-media.types";
import { getCategoryDescendantIds } from "./utils/getCategoryDescendantIds";

export class ProductService {
  constructor(
    private repo: ProductRepository,
    private prisma: PrismaClient,
  ) {}

  async getDetails(id: string) {
    const product = await this.repo.findByIdDetailed(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async create(input: ProductInput) {
    // ⭐ VALIDATE CATEGORY
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: input.category_id },
      select: { id: true },
    });

    if (!categoryExists) {
      throw new Error("Category not found");
    }

    // ⭐ VALIDATE BRAND
    if (input.type === "branded") {
      const brandExists = await this.prisma.brand.findUnique({
        where: { id: input.brand_id },
        select: { id: true },
      });

      if (!brandExists) {
        throw new Error("Brand not found");
      }
    }

    // ⭐ SPLIT PHOTOS
    const { photos, ...rest } = input;

    const created = await this.repo.createProduct({
      ...rest,
      photos: [],
    });

    // ⭐ MEDIA LIFECYCLE
    if (photos?.length) {
      const validPhotos = photos.filter(
        (p): p is TempProductPhoto => !!p.objectName,
      );

      if (validPhotos.length) {
        const finalized = await finalizeProductPhotos(created.id, validPhotos);

        await this.repo.attachPhotos(created.id, finalized);

        // async worker trigger
        Promise.all(
          finalized.map((p) =>
            generateProductPhotoVariants(created.id, p.objectName),
          ),
        );
      }
    }

    return created;
  }

  async update(id: string, input: ProductInput) {
    await this.repo.updateProduct(id, input);
  }

  async delete(id: string) {
    await this.repo.deleteProduct(id);
  }

  async searchProducts(filters: ProductSearchFilters) {
    const { query, type, categoryId, brandId, page = 1, limit = 20 } = filters;

    const where: Prisma.ProductWhereInput = {};

    if (type) where.type = type;

    if (categoryId) {
      const ids = await getCategoryDescendantIds(this.prisma, categoryId);

      where.categoryId = { in: ids };
    }

    if (brandId) where.brandId = brandId;

    if (query) {
      where.OR = [
        { nameEn: { contains: query, mode: "insensitive" } },
        { nameUa: { contains: query, mode: "insensitive" } },
      ];
    }

    const { items, total } = await this.repo.findManyProductsWithCount(
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

    const items = await this.repo.findGenericProductByQuery(query);

    return items;
  }
}
