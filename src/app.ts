import express, { Application, json } from "express";
import { courseRouter, userRouter } from "./routers";
import sessionRouter from "./routers/session.routter";
import { handleErrors } from "./middlewares";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/courses", courseRouter);

app.use(handleErrors);

export default app;
