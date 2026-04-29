import { PrismaClient } from "@prisma/client";

export class FamilyRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.family.findUnique({
      where: { id },
    });
  }

  async findMembers(familyId: string) {
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
