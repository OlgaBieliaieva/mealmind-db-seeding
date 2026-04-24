"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeTypeRepository = void 0;
class RecipeTypeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.recipeType.findMany({
            orderBy: { nameEn: "asc" },
        });
    }
}
exports.RecipeTypeRepository = RecipeTypeRepository;
