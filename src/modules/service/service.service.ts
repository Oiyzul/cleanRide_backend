import Env from "../../config";
import { User } from "../user/user.model";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import jwt, { JwtPayload } from "jsonwebtoken";

const saveServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

export const ServiceServices = {
  saveServiceIntoDB,
};
