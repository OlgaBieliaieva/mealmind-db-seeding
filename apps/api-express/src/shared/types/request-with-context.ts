import { Request } from "express";

export type RequestWithContext = Request & {
  context: {
    familyId: string;
  };
};
