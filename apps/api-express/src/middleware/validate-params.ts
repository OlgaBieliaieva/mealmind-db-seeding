import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateParams(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      next(err);
    }
  };
}
