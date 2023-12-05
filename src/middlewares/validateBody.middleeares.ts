import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateBody =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validateData = schema.parse(req.body);
    req.body = validateData;
    return next();
  };

export { validateBody };
