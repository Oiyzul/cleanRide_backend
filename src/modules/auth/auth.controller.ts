import { catchAsync } from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import { UserServices } from "./auth.service";

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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendRes({
    res,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.query;
  const result = await UserServices.getSingleUserFromDB(email as string);

  sendRes({
    res,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.updateUserIntoDB(userId, req.body);

  sendRes({
    res,
    message: "Users updated successfully",
    data: result,
  });
});

export const UserControllers = {
  signup,
  login,
  getAllUsers,
  updateUser,
  getSingleUser,
};
