type FamilyMemberClientDTO = {
  id: string;
  name: string;
  sex: string;
  avatarUrl: string | null;
};

export function presentFamilyMember(member: {
  user: {
    id: string;
    firstName: string;
    lastName?: string | null;
    sex: string;
    avatarUrl: string | null;
  };
}): FamilyMemberClientDTO {
  return {
    id: member.user.id,
    name: member.user.firstName,
    sex: member.user.sex,
    avatarUrl: member.user.avatarUrl,
  };
}
