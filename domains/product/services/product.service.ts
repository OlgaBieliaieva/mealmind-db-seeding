import { productRepository } from "../repositories/product.repository";
import { ProductInput } from "../schemas/product.schema";

export async function createProduct(data: ProductInput) {
  return productRepository.create(data);
}
