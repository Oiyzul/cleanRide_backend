import { Types } from "mongoose";
import { z } from "zod";
import { Booking_Status } from "./slot.constant";

export const slotValidationSchema = z.object({
  service: z.instanceof(Types.ObjectId, {
    message: "Invalid service reference",
  }),
  date: z.string().datetime({ message: "Date is required" }),
  startTime: z.string({ required_error: "Start time is required" }),
  endTime: z.string({ required_error: "End time is required" }),
  isBooked: z.nativeEnum(Booking_Status).default(Booking_Status.available),
});
