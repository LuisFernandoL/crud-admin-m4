import { Request, Response } from "express";
import { User, UserRead, UserReturn } from "../interfaces";
import { userServices } from "../services";
import { userReturnSchema } from "../schemas";

const userCreate = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.creatUser(req.body);
  return res.status(201).json(user);
};

const readUsers = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.readUsers();
  return res.status(200).json(users);
};

const readUserAndCourses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersAndCourses = await userServices.readUserAndCourses(req.params.id);
  return res.status(200).json(usersAndCourses);
};

export default { userCreate, readUsers, readUserAndCourses };
