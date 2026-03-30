import { apiFetch } from "@/shared/lib/api/api";
import { ProductDetailsDto, ProductSearchResponseDto } from "./products.types";

// ===== SEARCH =====

export function searchProducts(params: {
  query?: string;
  type?: string;
  categoryId?: string;
  brandId?: string;
  page?: number;
  limit?: number;
}) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      qs.append(k, String(v));
    }
  });

  return apiFetch<ProductSearchResponseDto>(
    `/products/search?${qs.toString()}`,
  );
}

// ===== DETAILS =====

export function getProductDetails(id: string) {
  return apiFetch<ProductDetailsDto>(`/products/${id}`);
}

// ===== CREATE =====

export function createProduct(body: unknown) {
  return apiFetch<{ product_id: string }>(`/products`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ===== UPDATE =====

export function updateProduct(id: string, body: unknown) {
  return apiFetch<{ success: true }>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

// ===== LIFECYCLE =====

export function activateProduct(id: string) {
  return apiFetch<void>(`/products/${id}/activate`, {
    method: "POST",
  });
}

export function archiveProduct(id: string) {
  return apiFetch<void>(`/products/${id}/archive`, {
    method: "POST",
  });
}

export function restoreProduct(id: string) {
  return apiFetch<void>(`/products/${id}/restore`, {
    method: "POST",
  });
}

export function deleteProductHard(id: string) {
  return apiFetch<void>(`/products/${id}/hard`, {
    method: "DELETE",
  });
}

// ===== PHOTOS =====

export function addPhotos(productId: string, photos: unknown[]) {
  return apiFetch<void>(`/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({
      photos: {
        add: photos,
      },
    }),
  });
}

export function deletePhoto(productId: string, photoId: string) {
  return apiFetch<void>(`/products/${productId}/photos/${photoId}`, {
    method: "DELETE",
  });
}
