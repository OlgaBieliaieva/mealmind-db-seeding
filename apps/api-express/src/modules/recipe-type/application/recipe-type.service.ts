import { RecipeTypeRepository } from "../domain/recipe-type.repository";

export class RecipeTypeService {
  constructor(private repo: RecipeTypeRepository) {}

  async getAll() {
    return this.repo.findAll();
  }
}
