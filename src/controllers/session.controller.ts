import { SessionReturn } from "../interfaces";
import { sessionServices } from "../services";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<Response> => {
  const token: SessionReturn = await sessionServices.creat(req.body);
  return res.status(200).json(token);
};

export default { create };
