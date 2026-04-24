"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationQuery = void 0;
class ProductValidationQuery {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async categoryExists(id) {
        const result = await this.prisma.category.findUnique({
            where: { id },
            select: { id: true },
        });
        return !!result;
    }
    async brandExists(id) {
        const result = await this.prisma.brand.findUnique({
            where: { id },
            select: { id: true },
        });
        return !!result;
    }
}
exports.ProductValidationQuery = ProductValidationQuery;
