import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";


const slotSchema = new Schema<TSlot>({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

export const Slot = model<TSlot>('Slot', slotSchema);


