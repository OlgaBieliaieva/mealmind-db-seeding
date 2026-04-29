import { useQuery } from "@tanstack/react-query";
import { getFamilyMembers } from "@/shared/api/family/family.api";

export function useFamilyMembers() {
  return useQuery({
    queryKey: ["family-members"],
    queryFn: getFamilyMembers,
  });
}
