"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuisineService = void 0;
class CuisineService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.findAll();
    }
}
exports.CuisineService = CuisineService;
