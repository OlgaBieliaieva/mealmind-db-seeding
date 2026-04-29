import { MealTypeRepository } from "../domain/meal-type.repository";

export class MealTypeService {
  constructor(private repo: MealTypeRepository) {}

  async getAll() {
    const items = await this.repo.findAll();

    return items;
  }
}
