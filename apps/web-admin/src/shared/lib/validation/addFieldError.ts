import { RefinementCtx, z } from "zod";

export function addFieldError(
  ctx: RefinementCtx,
  path: (string | number)[],
  message: string,
) {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    path,
    message,
  });
}
