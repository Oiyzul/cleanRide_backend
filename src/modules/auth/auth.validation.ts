import { z } from "zod";
import { User_roles } from "../user/user.constant";


const createUserValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  phone: z.string().regex(/^[0-9]{10,11}$/, {
    message: "Phone number must be between 10 to 11 digits",
  }),
  role: z
    .nativeEnum(User_roles, {
      message: "Role must be either 'admin' or 'user'",
    })
    .default(User_roles.user),
  address: z.string().min(1, { message: "Address is required" }),
});

const loginValidaitonSchema = z.object({
  email: z.string({required_error: 'Email is required.'}).email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

export const AuthValidations = {
  createUserValidationSchema,
  loginValidaitonSchema,
};
