import { catchAsync } from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import { MyServices } from "./me.service";

const getMyBookings = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  const result = await MyServices.getAllMyBookinsFromDB(token as string);

  sendRes({
    res,
    message:  "My bookings retrieved successfully",
    data: result,
  });
});

export const MyControllers = {
  getMyBookings,
};
