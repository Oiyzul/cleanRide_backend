import { User } from "./user.model";

const signupIntoDB = async(payload) => {
    const result = await User.create(payload)
    return result
};

export const UserServices = {
  signupIntoDB,
};
