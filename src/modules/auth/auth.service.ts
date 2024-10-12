import Env from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TUser } from "./auth.interface";

import { isPasswordMatched } from "./auth.utils";
import jwt from "jsonwebtoken";

const signupIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload?.email });

  if (user) {
    throw new AppError(400, "User already exists");
  }

  const result = await User.create(payload);

  const jwtPayload = {
    name: result.name,
    email: result.email,
    role: result.role,
  };

  const accessToken = jwt.sign(jwtPayload, Env.jwt_access_secret as string, {
    expiresIn: Env.jwt_access_expires_in,
  });

  return {
    accessToken,
    result,
  };
};

const loginIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(400, "User not found");
  }

  const passwordMatched = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatched) {
    throw new AppError(400, "Invalid password");
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, Env.jwt_access_secret as string, {
    expiresIn: Env.jwt_access_expires_in,
  });

  return {
    accessToken,
    user,
  };
};

const getAllUsersFromDB = async () => {
  const users = await User.find({});

  return users;
};

const getSingleUserFromDB = async (email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  return user;
};

const updateUserIntoDB = async (id: string, userData: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  console.log(user);
  return user;
};

export const UserServices = {
  signupIntoDB,
  loginIntoDB,
  getAllUsersFromDB,
  updateUserIntoDB,
  getSingleUserFromDB,
};
