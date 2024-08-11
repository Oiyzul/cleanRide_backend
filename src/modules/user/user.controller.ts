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

export const UserControllers = {
  signup,
};
