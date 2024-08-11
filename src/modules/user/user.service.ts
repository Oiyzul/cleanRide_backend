import { TUser } from "./user.interface";
import { User } from "./user.model";

const signupIntoDB = async (payload: TUser) => {
  //   const user = await User.findOne({ email: payload?.email });

  //   if (user) {
  //     throw new Error("User already exists");
  //   }
  const result = await User.create(payload);

  return result;
};

export const UserServices = {
  signupIntoDB,
};
