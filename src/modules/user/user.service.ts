import Env from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { isPasswordMatched } from "./user.utils";
import jwt from "jsonwebtoken";

const signupIntoDB = async (payload: TUser) => {
    const user = await User.findOne({ email: payload?.email });

    if (user) {
      throw new Error("User already exists");
    }
  const result = await User.create(payload);

  return result;
};

const loginIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload?.email }).select('+password');

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatched = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatched) {
    throw new Error("Invalid password");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(jwtPayload, Env.jwt_access_secret as string, {
    expiresIn: Env.jwt_access_expires_in
  })

  return {
    accessToken, user
  }
};

export const UserServices = {
  signupIntoDB,
  loginIntoDB,
};
