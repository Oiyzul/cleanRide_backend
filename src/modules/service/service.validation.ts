import { z } from "zod";

const createServiceValidationSchema = z.object({
  name: z.string().min(1, { message: "Service name is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  duration: z
    .number()
    .positive({ message: "Duration must be a positive number" }),
    imgUrl: z
    .string()
    .min(10, { message: "Invalid imgUrl" }).optional(),
  isDeleted: z.boolean().default(false),
});

export const ServiceValidations = {
  createServiceValidationSchema,
};
