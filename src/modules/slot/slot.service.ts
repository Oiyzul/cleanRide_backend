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

export const SlotServices = {
  getAvailableSlotsFromDB,
};
