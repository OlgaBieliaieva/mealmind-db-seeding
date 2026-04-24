import { apiFetch } from "@/shared/lib/api/fetcher";

export function getFamily() {
  return apiFetch<{ id: string; name: string }>("/families");
}
