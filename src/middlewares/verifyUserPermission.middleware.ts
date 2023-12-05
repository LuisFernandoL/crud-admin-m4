import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyUserPermission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const { sub, admin } = res.locals.decoded;

  if (admin) return next();

  if (id !== sub) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};

export { verifyUserPermission };
