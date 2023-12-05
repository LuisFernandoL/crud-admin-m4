import format from "pg-format";
import {
  Course,
  CourseAddUser,
  CourseCreate,
  CourseRead,
  CourseResult,
} from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const createCourse = async (data: CourseCreate): Promise<Course> => {
  const queryFormat: string = format(
    `INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows[0];
};

const readCourse = async (): Promise<CourseRead> => {
  const queryResult: CourseResult = await client.query(
    `SELECT * FROM "courses";`
  );

  return queryResult.rows;
};

const addUser = async (courseId: string, userId: string): Promise<void> => {
  const queryString: string = ` 
  INSERT INTO "userCourses" 

  ("active", "courseId", "userId")
    VALUES ( TRUE, $1, $2)
    RETURNING *;
  `;
  await client.query(queryString, [courseId, userId]);
};

const inactivate = async (userId: string, courseId: string): Promise<void> => {

  const queryString: string = ` 
  UPDATE "userCourses" 
  SET "active" = false
    WHERE "courseId" = $2 AND "userId" = $1;
  `;
  const query = await client.query(queryString, [courseId, userId]);

};

const readCourseAndusers = async (id: string) => {
  const query: string = `
    SELECT 
      "u"."id" "userId",
      "u"."name" "userName",
      "c"."id" "courseId",
      "c"."name" "courseName",
      "c"."description" "courseDescription",
      "uc"."active" "userActiveInCourse"
  FROM "courses" AS "c"
  JOIN "userCourses" AS "uc"
    ON "c"."id" = "uc"."courseId"
  JOIN "users" "u"
    ON "u"."id" = "uc"."userId"
  WHERE "c"."id" = $1;
  `;
  const queryResult = await client.query(query, [id]);

  if (!queryResult.rowCount) {
    throw new AppError("Course not found.", 404);
  }

  return queryResult.rows;
};

export default { createCourse, readCourse, addUser, inactivate, readCourseAndusers };
