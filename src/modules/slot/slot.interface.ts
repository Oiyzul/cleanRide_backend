import { Types } from "mongoose";
import { Booking_Status } from "./slot.constant";

export type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: keyof typeof Booking_Status;
};
