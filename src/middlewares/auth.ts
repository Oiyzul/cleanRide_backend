import { NextFunction, Request, Response } from "express";
import { User_roles } from "../modules/user/user.constant";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import Env from "../config";

export const auth = (...requiredRoles: (keyof typeof User_roles)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) {
      throw new Error("Token not provided");
    }

    const verifiedToken = jwt.verify(token, Env.jwt_access_secret as string);
    const { role, email } = verifiedToken as JwtPayload;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    if (role !== user?.role) {
      throw new Error("Unauthorized access");
    }

    if (!requiredRoles.includes(role)) {
      throw new Error("Only admin can create services");
    }
    
    next();
  });
};
