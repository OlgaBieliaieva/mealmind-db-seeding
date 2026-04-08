import { DietaryTag } from "@prisma/client";

type DietaryTagEntity = DietaryTag;

export function presentDietaryTag(tag: DietaryTagEntity) {
  return {
    id: tag.id,
    code: tag.code,
    name: {
      en: tag.nameEn,
      ua: tag.nameUa,
    },
  };
}

export function presentDietaryTagList(tags: DietaryTagEntity[]) {
  return tags.map(presentDietaryTag);
}
