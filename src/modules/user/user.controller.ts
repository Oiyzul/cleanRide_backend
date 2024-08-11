import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const signup = catchAsync(async (req, res) => {
  try {
    const result = await UserServices.signupIntoDB(req.body);
    console.log(result)
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User created successfully",
        data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const result = await UserServices.loginIntoDB(req.body);
    
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        token: result?.accessToken,
        data: result?.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export const UserControllers = {
  signup,
  login
};
