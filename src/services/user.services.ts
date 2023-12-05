import format from "pg-format";
import {
  User,
  UserCreate,
  UserRead,
  UserResult,
  UserReturn,
} from "../interfaces";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userReadSchema, userReturnSchema } from "../schemas";
import { AppError } from "../errors";

const creatUser = async (data: UserCreate): Promise<UserReturn> => {
  data.password = await hash(data.password, 10);

  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: UserResult = await client.query(queryFormat);
  return userReturnSchema.parse(queryResult.rows[0]);
};

const readUsers = async (): Promise<UserRead> => {
  const query: UserResult = await client.query(`SELECT * FROM "users";`);

  return userReadSchema.parse(query.rows);
};

const readUserAndCourses = async (id: string) => {

  const query: string = `
    SELECT 
      "c"."id" "courseId",
      "c"."name" "courseName",
      "c"."description" "courseDescription",
      "uc"."active" "userActiveInCourse",
      "u"."id" "userId",
     "u"."name" "userName"
  FROM "users" AS "u"
  JOIN "userCourses" AS "uc"
    ON "u"."id" = "uc"."userId"
  JOIN "courses" "c"
    ON "c"."id" = "uc"."courseId"
  WHERE "u"."id" = $1;
  `;
  const queryResult = await client.query(query, [id]);

  if (!queryResult.rowCount) {
    throw new AppError("No course found", 404);
  }

  return queryResult.rows;
};

export default { creatUser, readUsers, readUserAndCourses };
