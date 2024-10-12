import { Types } from "mongoose";
import { Vehicle_types } from "./booking.constant";

export type TBooking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: keyof typeof Vehicle_types;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  transactionId: string;
  paymentStatus: string;
  paymentConfirmationDate?: string;
};

export type TBookingPayload = {
  customer: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  vehicleType: keyof typeof Vehicle_types;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
