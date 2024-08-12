import { catchAsync } from "../../utils/catchAsync";
import { MyServices } from "./me.service";

const getMyBookings = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  const result = await MyServices.getAllMyBookinsFromDB(token as string);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "My bookings retrieved successfully",
    data: result
  });
});

export const MyControllers = {
  getMyBookings,
};
