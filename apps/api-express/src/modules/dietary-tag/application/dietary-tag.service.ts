import { DietaryTagRepository } from "../domain/dietary-tag.repository";

export class DietaryTagService {
  constructor(private repo: DietaryTagRepository) {}

  async getAll() {
    return this.repo.findAll();
  }
}
