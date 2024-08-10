import { z } from "zod";

export const serviceValidationSchema = z.object({
  name: z.string().min(1,{ message: 'Service name is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  duration: z.number().positive({ message: 'Duration must be a positive number' }),
  isDeleted: z.boolean().default(false),
});