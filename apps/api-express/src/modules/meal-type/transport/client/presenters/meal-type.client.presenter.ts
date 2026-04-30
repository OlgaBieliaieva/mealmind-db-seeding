import { MealType } from "@prisma/client";

export type MealTypeClientDTO = {
  id: string;
  code: string;
  name: string;
};

export function presentMealTypeClient(mt: MealType): MealTypeClientDTO {
  return {
    id: mt.id,
    code: mt.code,
    name: mt.nameUa,
  };
}
