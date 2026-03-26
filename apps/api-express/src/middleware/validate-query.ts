import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateQuery(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (err) {
      next(err);
    }
  };
}
