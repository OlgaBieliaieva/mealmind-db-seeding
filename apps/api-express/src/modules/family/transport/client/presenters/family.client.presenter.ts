type FamilyMemberClientDTO = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export function presentFamilyMember(member: {
  user: {
    id: string;
    firstName: string;
    lastName?: string | null;
    avatarUrl: string | null;
  };
}): FamilyMemberClientDTO {
  return {
    id: member.user.id,
    name: member.user.firstName,
    avatarUrl: member.user.avatarUrl,
  };
}
