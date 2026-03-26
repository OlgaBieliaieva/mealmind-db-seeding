import { ProductPhotoType } from "@prisma/client";

export type ProductPhotoUploadDto = {
  type: ProductPhotoType;
  objectName: string;
};



  
