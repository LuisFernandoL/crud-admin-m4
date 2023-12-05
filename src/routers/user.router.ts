import { Router } from "express";
import { userController } from "../controllers";
import {
  emailExist,
  userExists,
  validadeAdmin,
  validateBody,
  validateToken,
  verifyUserPermission,
} from "../middlewares";
import { userSchemaCreate } from "../schemas";

const userRourter: Router = Router();

userRourter.post(
  "",
  validateBody(userSchemaCreate),
  emailExist,
  userController.userCreate
);

userRourter.get("", validateToken, validadeAdmin, userController.readUsers);

userRourter.get(
  "/:id/courses",
  validateToken,
  validadeAdmin,
  userExists,
  userController.readUserAndCourses
);

export default userRourter;
