import { RequestHandler } from "express";
import { RequestWithContext } from "../shared/types/request-with-context";

export const withFamily: RequestHandler = (req, res, next) => {
  const familyId = req.headers["x-family-id"];
  const userId = req.headers["x-user-id"]; // 👈 додаємо

  if (!familyId || typeof familyId !== "string") {
    return res.status(400).json({
      message: "x-family-id header is required",
    });
  }

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({
      message: "x-user-id header is required",
    });
  }

  (req as RequestWithContext).context = {
    familyId,
    userId,
  };

  next();
};
