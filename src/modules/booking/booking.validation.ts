import mongoose, { Types } from "mongoose";
import { z } from "zod";
import { Vehicle_types } from "./booking.constant";

const createBookingValidationSchema = z.object({
  serviceId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  slotId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  vehicleType: z.nativeEnum(Vehicle_types, { message: "Invalid vehicle type" }),
  vehicleBrand: z.string().nonempty({ message: "Vehicle brand is required" }),
  vehicleModel: z.string().nonempty({ message: "Vehicle model is required" }),
  manufacturingYear: z
    .number()
    .min(1886, { message: "Manufacturing year must be 1886 or later" }),
  registrationPlate: z
    .string()
    .nonempty({ message: "Registration plate is required" }),
});

export const BookingValidations = {
  createBookingValidationSchema
}