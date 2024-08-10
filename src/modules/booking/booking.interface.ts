import { Types } from "mongoose";
import { Vehicle_types } from "./booking.constant";

export type Booking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: keyof typeof Vehicle_types;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
