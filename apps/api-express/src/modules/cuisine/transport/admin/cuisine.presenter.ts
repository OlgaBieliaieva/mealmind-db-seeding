import { Cuisine } from "@prisma/client";

type CuisineEntity = Cuisine;

export function presentCuisine(cuisine: CuisineEntity) {
  return {
    id: cuisine.id,
    code: cuisine.code,
    name: {
      en: cuisine.nameEn,
      ua: cuisine.nameUa,
    },
  };
}

export function presentCuisineList(cuisines: CuisineEntity[]) {
  return cuisines.map(presentCuisine);
}
