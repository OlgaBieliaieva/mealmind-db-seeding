import { z } from "zod";

export const ProductPhotoParamsSchema = z.object({
  id: z.string().uuid(),
  photoId: z.string().uuid(),
});

export type ProductPhotoParams = z.infer<typeof ProductPhotoParamsSchema>;
