import { Response } from "express";
import AppError from "../../errors/AppError";
import { TSlot } from "../slot/slot.interface";
import { Slot } from "../slot/slot.model";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import { generateSlots } from "./service.utils";

const saveServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  
  return result;
};

const getSingleServiceFromDB = async (payload: string, res: Response) => {
  const result = await Service.findById(payload);

  return result;
};

const getAllServiceFromDB = async (res: Response) => {
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

const saveSlotIntoDB = async (payload: TSlot, res: Response) => {
  const { service, startTime, endTime, date } = payload;

  const savedService = await Service.findById(service);
  if (!savedService) {
    throw new AppError(400, "Service not found: " + service);
  }

  // Validate slot availability and duration
  const availableSlots = await Slot.find({
    service,
    date,
    startTime: { $gte: startTime, $lte: endTime },
    endTime: { $gte: startTime, $lte: endTime },
    isBooked: "available",
  })

  if (availableSlots.length !== 0) {
    throw new AppError(400, "Slot is not available");
  }
  
  const slots = generateSlots(
    startTime,
    endTime,
    savedService?.duration as number
  );

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
