import { type Request, type Response, type NextFunction } from "express";
import { validationResult } from "express-validator";
import { ErrorWithStatus } from "../types/types";
export function verifyValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const valResult = validationResult(req);
  if (valResult.isEmpty()) {
    next();
  } else {
    const error: ErrorWithStatus = new Error("validation error");
    error.status = 400;
    next(error);
  }
}
