"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeTypeService = void 0;
class RecipeTypeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.findAll();
    }
}
exports.RecipeTypeService = RecipeTypeService;
