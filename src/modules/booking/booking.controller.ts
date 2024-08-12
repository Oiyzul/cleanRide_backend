import { get } from "mongoose"
import { catchAsync } from "../../utils/catchAsync"
import { BookingServices } from "./booking.service"

const bookService = catchAsync(async(req, res)=> {
    const token = req.headers.authorization?.split(' ')?.[1]
const result = await BookingServices.bookServiceIntoDB(req.body, token as string)

res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Service booked successfully",
    data: result,
})
})

const getAllBookins = catchAsync(async(req, res)=> {
    const result = await BookingServices.getAllBookingsFromDB()

res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All bookings retrieved successfully",
    data: result,
})
});

export const BookingControllers = {
    bookService,
    getAllBookins
}