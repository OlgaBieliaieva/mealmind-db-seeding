"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyService = void 0;
class FamilyService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getFamily(familyId) {
        const family = await this.repo.findById(familyId);
        if (!family) {
            throw new Error("Family not found");
        }
        return {
            id: family.id,
            name: family.name,
        };
    }
}
exports.FamilyService = FamilyService;
