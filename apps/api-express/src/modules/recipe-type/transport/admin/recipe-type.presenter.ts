import { RecipeType} from "@prisma/client";

type RecipeTypeEntity = RecipeType;

export function presentRecipeType(recipeType: RecipeTypeEntity) {
  return {
    id: recipeType.id,
    code: recipeType.code,
    name: {
      en: recipeType.nameEn,
      ua: recipeType.nameUa,
    },
  };
}

export function presentRecipeTypeList(recipeTypes: RecipeTypeEntity[]) {
  return recipeTypes.map(presentRecipeType);
}
