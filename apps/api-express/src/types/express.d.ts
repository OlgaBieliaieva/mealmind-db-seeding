import { ParsedQs } from "qs";

declare module "express-serve-static-core" {
  interface Request<
    P = Record<string, unknown>,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = ParsedQs,
  > {
    validatedQuery?: ReqQuery;
  }
}
