"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeAuthorRepository = void 0;
class RecipeAuthorRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async create(data) {
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
exports.RecipeAuthorRepository = RecipeAuthorRepository;
