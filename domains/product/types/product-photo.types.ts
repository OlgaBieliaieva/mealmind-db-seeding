import { ProductPhotoType } from "../constants/product.constants";

export type TempProductPhoto = {
  type: ProductPhotoType;
  url: string;
  objectName: string;
};

export type ProductPhoto = {
  type: ProductPhotoType;
  url: string;
};
