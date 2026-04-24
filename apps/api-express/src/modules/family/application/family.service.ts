import { FamilyRepository } from "../domain/family.repository";

export class FamilyService {
  constructor(private repo: FamilyRepository) {}

  async getFamily(familyId: string) {
    const family = await this.repo.findById(familyId);

    if (!family) {
      throw new Error("Family not found");
    }

    return {
      id: family.id,
      name: family.name,
    };
  }
}
