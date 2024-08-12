import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    
    const parsedBody = await schema.parseAsync(body);

    req.body = parsedBody;

    next();
  });
};

export default validateRequest;
