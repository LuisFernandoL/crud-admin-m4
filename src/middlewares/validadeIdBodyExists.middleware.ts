import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

const validadeIdBodyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.body;

  const queryResult: QueryResult = await client.query(
    `SELECT * FROM "users" WHERE "id" = $1;`,
    [userId]
  );

  if (!queryResult.rowCount) {
    throw new AppError("User not found.", 404);
  }

  res.locals = { ...res.locals, foundUser: queryResult.rows[0] };
  return next();
};

export { validadeIdBodyExists };
