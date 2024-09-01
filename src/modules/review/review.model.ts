import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    customerId: { type: Schema.Types.ObjectId },
    customerName: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
