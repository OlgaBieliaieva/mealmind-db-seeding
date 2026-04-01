import {
  REQUIRED_MACRO_VALUES,
  MacroNutrientCode,
} from "../constants/nutrient.macros";
import { REQUIRED_NUTRIENTS } from "../constants/nutrient.meta";

export function isMacroNutrient(code: string): code is MacroNutrientCode {
  console.log(REQUIRED_NUTRIENTS);

  return REQUIRED_MACRO_VALUES.includes(code as MacroNutrientCode);
}
