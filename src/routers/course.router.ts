import { Router } from "express";
import {
  userExists,
  userParamsIdExist,
  validadeAdmin,
  validadeIdBodyExists,
  validateBody,
  validateCourseExists,
  validateToken,
  verifyCourseExistsParams,
} from "../middlewares";
import { courseCreateSchema } from "../schemas";
import { courseController } from "../controllers";

const courseRouter: Router = Router();

courseRouter.post(
  "",
  validateBody(courseCreateSchema),
  validateToken,
  validadeAdmin,
  courseController.createCourse
);

courseRouter.get("", courseController.readCourse);
courseRouter.post(
  "/:courseId/users/:userId",
  validateToken,
  validadeAdmin,
  userParamsIdExist,
  verifyCourseExistsParams,
  courseController.addUser
);
courseRouter.delete(
  "/:courseId/users/:userId",
  validateToken,
  validadeAdmin,
  userParamsIdExist,
  verifyCourseExistsParams,
  courseController.inactivate
);

courseRouter.get(
  "/:id/users",
  validateToken,
  validadeAdmin,
  userExists,
  courseController.readCourseAndUsers
);

export default courseRouter;
