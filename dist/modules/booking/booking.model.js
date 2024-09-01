"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: "Service", required: true },
    slot: { type: mongoose_1.Schema.Types.ObjectId, ref: "Slot", required: true },
    vehicleType: {
        type: String,
        enum: Object.keys(booking_constant_1.Vehicle_types),
        required: true,
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true, min: 1886 },
    registrationPlate: { type: String, required: true, unique: true },
    transactionId: { type: String, required: true },
    paymentStatus: { type: String },
    paymentConfirmationDate: { type: String },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
