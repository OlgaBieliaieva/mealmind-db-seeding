// SECTION ███ CATEGORY TYPES ███
// WHY: shared types for categories API and UI

export type Category = {
  id: string;

  nameEn: string;

  nameUa: string;

  parentId: string | null;
};

/*
Tree structure used in UI (category selectors)
*/

export type CategoryNode = {
  id: string;

  name: {
    en: string;
    ua: string;
  };

  children: CategoryNode[];
};
