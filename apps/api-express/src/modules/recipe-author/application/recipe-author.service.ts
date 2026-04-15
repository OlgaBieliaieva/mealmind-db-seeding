import { RecipeAuthorRepository } from "../domain/recipe-author.repository";

export class RecipeAuthorService {
  constructor(private repo: RecipeAuthorRepository) {}

  async getAll() {
    return this.repo.findAll();
  }

  async create(input: {
    display_name: string;
    type: "user" | "blogger" | "system";
    avatar_url?: string | null;
    profile_url?: string | null;
  }) {
    return this.repo.create(input);
  }
}
