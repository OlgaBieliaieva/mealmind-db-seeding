import { AppError } from "./app-error";

export class BadRequestError extends AppError {
  constructor(code: string, message: string) {
    super(code, 400, message);
  }
}

export class NotFoundError extends AppError {
  constructor(code: string, message: string) {
    super(code, 404, message);
  }
}
