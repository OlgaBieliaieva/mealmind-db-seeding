import { generateUUID } from "@/lib/uuid";

type Photo = {
  type: "packaging" | "ingredients" | "other";
  url: string;
};

export function mapPhotosToRows(productId: string, photos?: Photo[]) {
  if (!photos) return [];

  const now = new Date().toISOString();

  return photos.map((photo) => [
    generateUUID(), // photo_id
    productId, // product_id
    photo.type, // photo_type
    photo.url, // url
    now, // uploaded_at
  ]);
}
