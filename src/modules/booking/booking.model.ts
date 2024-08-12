import { model, Schema } from "mongoose";
import { Vehicle_types } from "./booking.constant";

const bookingSchema = new Schema(
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
  },
  { timestamps: true }
);

export const Booking = model("Booking", bookingSchema);
