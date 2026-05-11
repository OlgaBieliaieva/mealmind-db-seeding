import { apiFetch } from "@/shared/lib/api/fetcher";

export type FamilyMemberDTO = {
  id: string;
  name: string;
  sex: string;
  avatarUrl: string | null;
};

export function getFamily() {
  return apiFetch<{ id: string; name: string }>("/families");
}

export function getFamilyMembers() {
  return apiFetch<FamilyMemberDTO[]>("/families/members");
}
