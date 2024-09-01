import { model, Schema } from "mongoose";
import { Vehicle_types } from "./booking.constant";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
    vehicleType: {
      type: String,
      enum: Object.keys(Vehicle_types),
      required: true,
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true, min: 1886 },
    registrationPlate: { type: String, required: true, unique: true },
    transactionId: { type: String, required: true },
    paymentStatus: { type: String },
    paymentConfirmationDate: { type: String },
  },
  { timestamps: true }
);

export const Booking = model("Booking", bookingSchema);
