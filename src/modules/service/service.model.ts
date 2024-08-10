import mongoose from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new mongoose.Schema<TService>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Service = mongoose.model<TService>("Service", serviceSchema);
