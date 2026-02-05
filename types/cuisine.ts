export type Cuisine = {
  cuisine_id: number;
  code: string;
  name: {
    en: string;
    ua: string;
  };
  region?: string | null;
};
