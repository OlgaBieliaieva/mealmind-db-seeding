"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandService = void 0;
class BrandService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.findAll();
    }
}
exports.BrandService = BrandService;
