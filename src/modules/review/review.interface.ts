import { Types } from "mongoose";

export type TReview = {
  customerId: Types.ObjectId;
  customerName: string;
  feedback: string;
  rating: number;
};
