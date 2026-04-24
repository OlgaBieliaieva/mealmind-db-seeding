import { RequestHandler } from "express";
import { RequestWithContext } from "../shared/types/request-with-context";

export const withFamily: RequestHandler = (req, res, next) => {
  const familyId = req.headers["x-family-id"];

  if (!familyId || typeof familyId !== "string") {
    return res.status(400).json({
      message: "x-family-id header is required",
    });
  }

  // 👇 каст тільки тут — це нормально
  (req as RequestWithContext).context = {
    familyId,
  };

  next();
};
