import Env from "../../config";
import { TSlot } from "../slot/slot.interface";
import { Slot } from "../slot/slot.model";
import { User } from "../user/user.model";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateSlots } from "./service.utils";

const saveServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getSingleServiceFromDB = async (payload: string) => {
  const result = await Service.findById(payload);
  return result;
};

const getAllServiceFromDB = async () => {
  const result = await Service.find();
  return result;
};

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  );
  return result;
};

const saveSlotIntoDB = async (payload: TSlot) => {
  const { service, startTime, endTime, date } = payload;

  const savedService = await Service.findById(service);
  if (!savedService) {
    throw new Error("Service not found");
  }

  // Validate slot availability and duration with service duration
  const slots = generateSlots(startTime, endTime, savedService?.duration);
  
  // Create slot
  const possibleSlots = slots.map((slot) => ({
    service: service,
    date: date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    isBooked: payload?.isBooked,
  }));

  const createdSlots = await Slot.insertMany(possibleSlots);
  return createdSlots;
};

export const ServiceServices = {
  saveServiceIntoDB,
  getSingleServiceFromDB,
  getAllServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  saveSlotIntoDB,
};
