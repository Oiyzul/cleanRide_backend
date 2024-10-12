"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
const zod_1 = require("zod");
const createServiceValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Service name is required" }),
    description: zod_1.z
        .string()
        .min(10, { message: "Description must be at least 10 characters" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    duration: zod_1.z
        .number()
        .positive({ message: "Duration must be a positive number" }),
    imgUrl: zod_1.z.string().optional(),
    features: zod_1.z.array(zod_1.z.string({ required_error: 'Features is required.' })),
    unavailableFeatures: zod_1.z.array(zod_1.z.string()).optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.ServiceValidations = {
    createServiceValidationSchema,
};
