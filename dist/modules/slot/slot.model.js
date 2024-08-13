"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slot_constant_1 = require("./slot.constant");
const date_fns_1 = require("date-fns");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isBooked: {
        type: String,
        enum: Object.keys(slot_constant_1.Booking_Status),
        default: slot_constant_1.Booking_Status.available,
    },
}, { timestamps: true });
slotSchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        this.date = (0, date_fns_1.format)(this.date, 'yyyy-MM-dd');
    });
});
exports.Slot = (0, mongoose_1.model)("Slot", slotSchema);
