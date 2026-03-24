import { ProductPhotoType } from "@prisma/client";

export type TempProductPhoto = {
  type: ProductPhotoType;
  objectName: string;
  url: string;
};
