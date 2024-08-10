import { Types } from "mongoose";
import { z } from "zod";

export const slotValidationSchema = z.object({
  service: z.instanceof(Types.ObjectId, { message: "Invalid service reference" }),
  date: z.date({ required_error: 'Date is required' }),
  startTime: z.date({ required_error: 'Start time is required' }),
  endTime: z.date({ required_error: 'End time is required' }),
  isBooked: z.boolean().default(false),
});