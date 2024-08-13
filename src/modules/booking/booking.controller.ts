import { catchAsync } from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import { BookingServices } from "./booking.service";

const bookService = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  const result = await BookingServices.bookServiceIntoDB(
    req.body,
    token as string
  );

  sendRes({
    res,
    message: "Service booked successfully",
    data: result,
  });
});

const getAllBookins = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendRes({
    res,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  bookService,
  getAllBookins,
};
