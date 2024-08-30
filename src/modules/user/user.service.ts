import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsersFromDB = async () => {
  const users = await User.find({});

  return users;
};

const getSingleUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);

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
  getAllUsersFromDB,
  updateUserIntoDB,
  getSingleUserFromDB,
};
