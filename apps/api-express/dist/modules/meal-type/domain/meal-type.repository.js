"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealTypeRepository = void 0;
class MealTypeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.mealType.findMany({
            orderBy: {
                orderIndex: "asc",
            },
        });
    }
}
exports.MealTypeRepository = MealTypeRepository;
