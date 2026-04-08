export type Cuisine = {
  id: string;
  code: string;
  name: {
    en: string;
    ua: string;
  };

  region?: string | null;
};
