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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const slot_model_1 = require("../slot/slot.model");
const service_model_1 = require("./service.model");
const service_utils_1 = require("./service.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const saveServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload)
    const result = yield service_model_1.Service.create(payload);
    console.log(result);
    return result;
});
const getSingleServiceFromDB = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(payload);
    return result;
});
const getAllServiceFromDB = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find();
    return result;
});
const updateServiceIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: delete slots associated with the service
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield slot_model_1.Slot.deleteMany({ service: id });
        const result = yield service_model_1.Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        console.log(err);
        yield session.endSession();
        yield session.abortTransaction();
        throw new Error(err);
    }
});
const saveSlotIntoDB = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { service, startTime, endTime, date } = payload;
    console.log(payload);
    const savedService = yield service_model_1.Service.findById(service);
    if (!savedService) {
        throw new AppError_1.default(400, "Service not found: " + service);
    }
    // Validate slot availability and duration
    const availableSlots = yield slot_model_1.Slot.find({
        service,
        date,
        startTime: { $gte: startTime, $lte: endTime },
        endTime: { $gte: startTime, $lte: endTime },
        isBooked: "available",
    });
    if (availableSlots.length !== 0) {
        throw new AppError_1.default(400, "Slot is not available");
    }
    const slots = (0, service_utils_1.generateSlots)(startTime, endTime, savedService === null || savedService === void 0 ? void 0 : savedService.duration);
    // Create slot
    const possibleSlots = slots.map((slot) => ({
        service: service,
        date: date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: payload === null || payload === void 0 ? void 0 : payload.isBooked,
    }));
    const createdSlots = yield slot_model_1.Slot.insertMany(possibleSlots);
    return createdSlots;
});
exports.ServiceServices = {
    saveServiceIntoDB,
    getSingleServiceFromDB,
    getAllServiceFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB,
    saveSlotIntoDB,
};
