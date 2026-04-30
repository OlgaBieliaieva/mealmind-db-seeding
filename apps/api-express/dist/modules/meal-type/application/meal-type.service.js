"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealTypeService = void 0;
class MealTypeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        const items = await this.repo.findAll();
        return items;
    }
}
exports.MealTypeService = MealTypeService;
