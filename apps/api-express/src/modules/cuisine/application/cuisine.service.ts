import { CuisineRepository } from "../domain/cuisine.repository";

export class CuisineService {
  constructor(private repo: CuisineRepository) {}

  async getAll() {
    return this.repo.findAll();
  }
}
