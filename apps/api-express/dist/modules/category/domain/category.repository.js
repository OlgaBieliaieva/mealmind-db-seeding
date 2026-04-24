"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
class CategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.category.findMany({
            select: {
                id: true,
                nameEn: true,
                nameUa: true,
                parentId: true,
            },
        });
    }
}
exports.CategoryRepository = CategoryRepository;
