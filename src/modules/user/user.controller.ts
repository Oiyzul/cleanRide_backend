import { catchAsync } from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import { UserServices } from "./user.service";

const signup = catchAsync(async (req, res) => {
  const result = await UserServices.signupIntoDB(req.body);

  sendRes({
    res,
    message: "User created successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await UserServices.loginIntoDB(req.body);

  sendRes({
    res,
    message: "User logged in successfully",
    token: result?.accessToken,
    data: result?.user,
  });
});

export const UserControllers = {
  signup,
  login,
};
