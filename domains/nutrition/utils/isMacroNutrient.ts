import {
  REQUIRED_MACRO_VALUES,
  MacroNutrientCode,
} from "../constants/nutrient.macros";

export function isMacroNutrient(code: string): code is MacroNutrientCode {
  return REQUIRED_MACRO_VALUES.includes(code as MacroNutrientCode);
}
