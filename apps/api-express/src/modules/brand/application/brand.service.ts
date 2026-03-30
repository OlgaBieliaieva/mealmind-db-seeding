import { BrandRepository } from "../domain/brand.repository";

export class BrandService {
  constructor(private repo: BrandRepository) {}

  async getAll() {
    return this.repo.findAll();
  }
}
