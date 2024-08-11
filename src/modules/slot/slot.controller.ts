import { catchAsync } from "../../utils/catchAsync";
import { SlotServices } from "./slot.service";

const getAvailableSlots = catchAsync(async (req, res)=> {
    console.log(req.query)
const result = await SlotServices.getAvailableSlotsFromDB(req?.query)

res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Available slots retrieved successfully",
    data: result,
 });
})

export const SlotControllers = {
    getAvailableSlots
}