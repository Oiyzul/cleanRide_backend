import { Types } from "mongoose";

export type TSlot = {
  service: Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
};
