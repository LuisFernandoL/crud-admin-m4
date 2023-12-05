import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

const verifyCourseExistsParams = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;

  const queryResult: QueryResult = await client.query(
    `SELECT * FROM "courses" WHERE "id" = $1;`,
    [courseId]
  );

  if (!queryResult.rowCount) {
    throw new AppError("User/course not found", 404);
  }

  res.locals = { ...res.locals, foundCourse: queryResult.rows[0] };
  return next();
};

export { verifyCourseExistsParams };
