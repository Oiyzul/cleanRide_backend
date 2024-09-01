import { Model } from "mongoose";
import { User_roles } from "./auth.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof User_roles;
  address: string;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
