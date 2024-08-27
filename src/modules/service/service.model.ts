import mongoose from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new mongoose.Schema<TService>(
  {
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
    imgUrl: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

serviceSchema.pre('find', async function (next) {
  this.find({ isDeleted: false });
  next();
})
serviceSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: false });
  next();
})

serviceSchema.pre('findOneAndUpdate', async function (next) {
  this.find({ isDeleted: false });
  next();
})

serviceSchema.set("toJSON", {
  transform: (doc, { __v, ...rest }) => rest,
});

export const Service = mongoose.model<TService>("Service", serviceSchema);
