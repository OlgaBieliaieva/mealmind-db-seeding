import {
  REQUIRED_MACRO_VALUES,
  MacroNutrientCode,
} from "../constants/nutrient.macros";
import { REQUIRED_NUTRIENTS } from "../constants/nutrient.meta";

export function isMacroNutrient(code: string): code is MacroNutrientCode {
  return REQUIRED_MACRO_VALUES.includes(code as MacroNutrientCode);
}
