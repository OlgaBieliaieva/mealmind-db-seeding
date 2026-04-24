import { PrismaClient } from "@prisma/client";

export class FamilyRepository {
  constructor(private prisma: PrismaClient) {}
  
  async findById(id: string) {
    return this.prisma.family.findUnique({
      where: { id },
    });
  }
}
