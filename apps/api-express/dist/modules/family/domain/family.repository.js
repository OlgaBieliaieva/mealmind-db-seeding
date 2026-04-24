"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyRepository = void 0;
class FamilyRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.family.findUnique({
            where: { id },
        });
    }
}
exports.FamilyRepository = FamilyRepository;
