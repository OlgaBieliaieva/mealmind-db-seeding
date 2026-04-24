"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuisineRepository = void 0;
class CuisineRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.cuisine.findMany({
            where: { isActive: true },
            orderBy: { nameEn: "asc" },
        });
    }
}
exports.CuisineRepository = CuisineRepository;
