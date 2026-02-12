import { readSheet } from "@/lib/sheets.read";
import { parseSheetBoolean } from "../utils/sheetBoolean";

export type FamilyMember = {
  user_id: string;
  first_name: string;
  avatar_url: string | null;
  sex: "male" | "female" | null;
};

export async function getFamilyMembers(familyId: string) {
  const memberRows = await readSheet("family_members!A2:F");
  const userRows = await readSheet("users!A2:K");

  const activeMembers = memberRows
    .filter((row) => row[1] === familyId && parseSheetBoolean(row[4]) === true)
    .map((row) => row[2]); // user_id

  return userRows
    .filter((row) => activeMembers.includes(row[0]))
    .map((row) => ({
      user_id: row[0],
      first_name: row[3],
      avatar_url: row[8] ?? null,
      sex: normalizeSex(row[5]),
    }));
}

function normalizeSex(value: unknown): "male" | "female" | null {
  if (value === "male") return "male";
  if (value === "female") return "female";
  return null;
}
