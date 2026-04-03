import { prisma } from "../../../../db/prisma";
import { Prisma } from "@prisma/client";

export const recipeRepository = {
  create(data: Prisma.RecipeCreateInput) {
    return prisma.recipe.create({
      data,
      include: {
        ingredients: true,
        steps: true,
        cuisines: true,
        dietaryTags: true,
      },
    });
  },

  findById(id: string) {
    return prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: true,
        steps: true,
        cuisines: {
          include: { cuisine: true },
        },
        dietaryTags: {
          include: { dietaryTag: true },
        },
        videos: {
          include: { author: true },
        },
        author: true,
      },
    });
  },
};
