import { Router } from "express";
import { sessionSchemaLogin } from "../schemas";
import { validateBody } from "../middlewares";
import { sessionController } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post("", validateBody(sessionSchemaLogin), sessionController.create);

export default sessionRouter;
