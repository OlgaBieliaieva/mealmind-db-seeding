"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietaryTagService = void 0;
class DietaryTagService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.findAll();
    }
}
exports.DietaryTagService = DietaryTagService;
