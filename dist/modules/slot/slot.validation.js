"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const slot_constant_1 = require("./slot.constant");
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const createSlotValidationSchema = zod_1.z.object({
    service: zod_1.z.string().refine((value) => {
        try {
            new mongoose_1.default.Types.ObjectId(value);
            return true;
        }
        catch (error) {
            return false;
        }
    }, { message: 'Invalid ObjectId format' }),
    date: zod_1.z.string()
        .regex(dateRegex, { message: 'Invalid date format (YYYY-MM-DD)' })
        .refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) && date.toISOString().startsWith(value);
    }, { message: 'Invalid date' }),
    startTime: zod_1.z.string({ required_error: "Start time is required" }),
    endTime: zod_1.z.string({ required_error: "End time is required" }),
    isBooked: zod_1.z.nativeEnum(slot_constant_1.Booking_Status).default(slot_constant_1.Booking_Status.available),
});
exports.SlotValidations = {
    createSlotValidationSchema,
};
