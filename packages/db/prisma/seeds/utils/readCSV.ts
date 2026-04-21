import fs from "fs";
import { parse } from "csv-parse/sync";

export function readCSV<T>(path: string): T[] {
  const file = fs.readFileSync(path);

  return parse(file, {
    columns: true,
    skip_empty_lines: true,
  }) as T[];
}
