import { CategoryRepository } from "../domain/category.repository";

export class CategoryService {
  constructor(private repo: CategoryRepository) {}

  async getAll() {
    return this.repo.findAll();
  }
}
