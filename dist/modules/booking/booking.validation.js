"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBookingValidationSchema = zod_1.z.object({
    serviceId: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    }),
    slotId: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    }),
    vehicleType: zod_1.z.nativeEnum(booking_constant_1.Vehicle_types, { message: "Invalid vehicle type" }),
    vehicleBrand: zod_1.z.string().nonempty({ message: "Vehicle brand is required" }),
    vehicleModel: zod_1.z.string().nonempty({ message: "Vehicle model is required" }),
    manufacturingYear: zod_1.z
        .number()
        .min(1886, { message: "Manufacturing year must be 1886 or later" }),
    registrationPlate: zod_1.z
        .string()
        .nonempty({ message: "Registration plate is required" }),
});
exports.BookingValidations = {
    createBookingValidationSchema
};
