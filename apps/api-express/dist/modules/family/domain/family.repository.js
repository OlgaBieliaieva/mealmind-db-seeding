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
    async findMembers(familyId) {
        return this.prisma.familyMember.findMany({
            where: {
                familyId,
                isActive: true,
            },
            orderBy: {
                joinedAt: "asc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        sex: true,
                        avatarUrl: true,
                    },
                },
            },
        });
    }
}
exports.FamilyRepository = FamilyRepository;
