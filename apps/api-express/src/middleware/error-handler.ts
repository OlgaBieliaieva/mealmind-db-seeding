import { AppError } from "../shared/errors/app-error";
import { Request, Response, NextFunction, Errback } from "express";

export function errorHandler(err: Errback, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  console.error("UNHANDLED ERROR:", err);

  return res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Something went wrong",
  });
}