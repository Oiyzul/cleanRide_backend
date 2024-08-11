import Env from "../../config";
import { TSlot } from "../slot/slot.interface";
import { Slot } from "../slot/slot.model";
import { User } from "../user/user.model";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import jwt, { JwtPayload } from "jsonwebtoken";

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

// Helper function to convert time string to minutes
function timeToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

// Helper function to convert minutes back to time string
function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minutesPart = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutesPart).padStart(
    2,
    "0"
  )}`;
}

function generateSlots(
  startTime: string,
  endTime: string,
  serviceDuration: number
) {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = Math.floor(totalDuration / serviceDuration);

  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = startMinutes + i * serviceDuration;
    const slotEndTime = slotStartTime + serviceDuration;
    slots.push({
      startTime: minutesToTime(slotStartTime),
      endTime: minutesToTime(slotEndTime),
    });
  }

  return slots;
}

const saveSlotIntoDB = async (payload: TSlot) => {
  const { startTime, endTime, date } = payload;
  const serviceDuration = 60;

  const slots = generateSlots(startTime, endTime, serviceDuration);
  console.log(slots);


// Create slot documents
const slotDocuments = slots.map(slot => ({
  service: payload.service,
  date: payload.date,
  startTime: slot.startTime,
  endTime: slot.endTime,
  isBooked: payload?.isBooked
}));

const createdSlots = await Slot.insertMany(slotDocuments);
  return createdSlots
};

export const ServiceServices = {
  saveServiceIntoDB,
  getSingleServiceFromDB,
  getAllServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  saveSlotIntoDB,
};
