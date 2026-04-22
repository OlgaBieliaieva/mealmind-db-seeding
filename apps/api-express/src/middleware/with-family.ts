import { RequestHandler } from "express";


export const withFamily: RequestHandler = (req, res, next) => {
  const familyId = req.headers["x-family-id"];

  if (!familyId || typeof familyId !== "string") {
    return res.status(400).json({
      message: "x-family-id header is required",
    });
  }

  req.context = { familyId };

  next();
};
