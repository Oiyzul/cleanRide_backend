import AppError from "../../errors/AppError";
import { Slot } from "./slot.model";

const getAvailableSlotsFromDB = async (query: any) => {
  const { serviceId, date } = query;

  const queryObject: any = {};
  if (date) {
    queryObject.date = date;
  }

  if (serviceId) {
    queryObject.service = serviceId;
  }

  const result = await Slot.find(queryObject).populate("service");

  return result;
};

const updateSlotIntoDB = async (id: string) => {
  const slot = await Slot.findById(id);

  if (!slot) {
    throw new AppError(404, "Slot not found");
  }

  slot.isBooked = "booked";
  await slot.save();
  
  return slot;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
  updateSlotIntoDB
};
