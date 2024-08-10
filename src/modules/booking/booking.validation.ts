import { Types } from "mongoose";
import { z } from "zod";
import { Vehicle_types } from "./booking.constant";

export const bookingValidationSchema = z.object({
  customer: z.instanceof(Types.ObjectId, {
    message: "Invalid customer reference",
  }),
  service: z.instanceof(Types.ObjectId, {
    message: "Invalid service reference",
  }),
  slot: z.instanceof(Types.ObjectId, { message: "Invalid slot reference" }),
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
