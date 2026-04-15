import { PrismaClient } from "@prisma/client";

export class RecipeAuthorRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.recipeAuthor.findMany({
      select: {
        id: true,
        displayName: true,
        type: true,
        avatarUrl: true,
        profileUrl: true,
      },
      orderBy: {
        displayName: "asc", // 🔥 одразу сортуємо тут
      },
    });
  }

  async create(data: {
    display_name: string;
    type: "user" | "blogger" | "system";
    avatar_url?: string | null;
    profile_url?: string | null;
  }) {
    return this.prisma.recipeAuthor.create({
      data: {
        displayName: data.display_name,
        type: data.type,
        avatarUrl: data.avatar_url ?? null,
        profileUrl: data.profile_url ?? null,
      },
      select: {
        id: true,
        displayName: true,
        type: true,
        avatarUrl: true,
        profileUrl: true,
      },
    });
  }
}
