export type CategoryNode = {
  category_id: number;
  name: {
    en: string;
    ua: string;
  };
  children: CategoryNode[];
};
