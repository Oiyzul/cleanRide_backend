import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Env from "../config";
import { User } from "../modules/user/user.model";
import { User_roles } from "../modules/user/user.constant";
import { catchAsync } from "../utils/catchAsync";

const authenticateRoute = (...requiredRoles: (keyof typeof User_roles)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }

    try {
      const verifiedToken = jwt.verify(token, Env.jwt_access_secret as string);
      const { role, email } = verifiedToken as JwtPayload;
      
      const user = await User.findOne({ email: email });

      if (role !== user?.role) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: "You do not have the required permissions",
        });
      }

      if (!requiredRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: "You do not have the required permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid token",
      });
    }
  });
};

export default authenticateRoute;
