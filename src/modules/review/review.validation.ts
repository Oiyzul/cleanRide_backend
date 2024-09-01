import mongoose from "mongoose";
import { z } from "zod";

const createReviewValidationSchema = z.object({
  customerId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  customerName: z.string(),
  feedback: z.string(),
  rating: z.number().refine((val) => val && val >= 0 && val <= 5),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};
