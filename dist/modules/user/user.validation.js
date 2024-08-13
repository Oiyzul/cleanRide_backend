"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(4, { message: "Password must be at least 4 characters" }),
    phone: zod_1.z.string().regex(/^[0-9]{10,11}$/, {
        message: "Phone number must be between 10 to 11 digits",
    }),
    role: zod_1.z
        .nativeEnum(user_constant_1.User_roles, {
        message: "Role must be either 'admin' or 'user'",
    })
        .default(user_constant_1.User_roles.user),
    address: zod_1.z.string().min(1, { message: "Address is required" }),
});
const loginValidaitonSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'Email is required.' }).email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(4, { message: "Password must be at least 4 characters" }),
});
exports.UserValidations = {
    createUserValidationSchema,
    loginValidaitonSchema,
};
