import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

const userParamsIdExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const queryResult: QueryResult = await client.query(
    `SELECT * FROM "users" WHERE "id" = $1;`,
    [userId]
  );

  if (!queryResult.rowCount) {
    throw new AppError("User/course not found", 404);
  }

  res.locals = { ...res.locals, foundUser: queryResult.rows[0] };
  return next();
};

export { userParamsIdExist };
