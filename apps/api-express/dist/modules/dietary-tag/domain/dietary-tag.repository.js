"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietaryTagRepository = void 0;
class DietaryTagRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.dietaryTag.findMany({
            where: { isActive: true },
            orderBy: { nameEn: "asc" },
        });
    }
}
exports.DietaryTagRepository = DietaryTagRepository;
