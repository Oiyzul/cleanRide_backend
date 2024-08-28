import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
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

const updateSlotIntoDB = async (id: string, slotData: Partial<TSlot>) => {
  const slot = await Slot.findById(id);
  console.log(slotData);
  if (!slot) {
    throw new AppError(404, "Slot not found");
  }

  const updatedSlot = await Slot.findByIdAndUpdate(id, slotData, { new: true });

  return updatedSlot;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
  updateSlotIntoDB,
};
