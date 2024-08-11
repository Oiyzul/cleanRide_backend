import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";
import { Booking_Status } from "./slot.constant";
import { format } from "date-fns";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: Object.keys(Booking_Status),
      default: Booking_Status.available,
    },
  },
  { timestamps: true }
);

slotSchema.post('save', async function() {
  //@ts-ignore
  this.date = format(this.date, 'yyyy-MM-dd')
})

export const Slot = model<TSlot>("Slot", slotSchema);
