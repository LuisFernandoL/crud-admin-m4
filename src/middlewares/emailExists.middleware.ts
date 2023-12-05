import { NextFunction, Response, Request } from "express";
import { UserResult } from "../interfaces";
import { AppError } from "../errors";
import { client } from "../database";

const emailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    return next();
  }
  const query: string = `SELECT * FROM "users" WHERE "email" = $1;`;
  const queryResult: UserResult = await client.query(query, [email]);

  if (queryResult.rowCount) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};

export { emailExist };
