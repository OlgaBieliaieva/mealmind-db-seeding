import { ApiError } from "../api/api-error";
import { ERROR_MESSAGES } from "./errorMessages";

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return ERROR_MESSAGES[error.code] || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Невідома помилка";
}
