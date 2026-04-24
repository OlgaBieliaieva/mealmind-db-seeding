"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeAuthorService = void 0;
class RecipeAuthorService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.findAll();
    }
    async create(input) {
        return this.repo.create(input);
    }
}
exports.RecipeAuthorService = RecipeAuthorService;
