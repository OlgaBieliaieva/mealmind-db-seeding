"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutrientQuery = void 0;
class NutrientQuery {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        return this.prisma.nutrient.findMany({
            orderBy: { sortOrder: "asc" },
        });
    }
}
exports.NutrientQuery = NutrientQuery;
