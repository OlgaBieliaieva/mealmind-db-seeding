"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRepository = void 0;
class BrandRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.brand.findMany({
            select: {
                id: true,
                nameEn: true,
                nameUa: true,
                country: true,
            },
            orderBy: {
                nameEn: "asc",
            },
        });
    }
}
exports.BrandRepository = BrandRepository;
