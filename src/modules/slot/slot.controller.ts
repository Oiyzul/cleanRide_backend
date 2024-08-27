import { catchAsync } from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import { SlotServices } from "./slot.service";

const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAvailableSlotsFromDB(req?.query);

  sendRes({
    res,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const result = await SlotServices.updateSlotIntoDB(slotId);

  sendRes({
    res,
    message: "Slot is updated successfully",
    data: result,
  });
});

export const SlotControllers = {
  getAvailableSlots,
  updateSlot,
};
