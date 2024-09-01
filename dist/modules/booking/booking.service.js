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
exports.BookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const decodeJWT_1 = require("../../utils/decodeJWT");
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("../slot/slot.model");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const payment_utils_1 = require("../payment/payment.utils");
const bookServiceIntoDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, slotId, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate, } = payload;
    const decodedToken = (0, decodeJWT_1.decodeJWT)(token);
    const customer = yield user_model_1.User.findOne({ email: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email });
    if (!customer) {
        throw new AppError_1.default(400, "User not found");
    }
    const service = yield service_model_1.Service.findById(serviceId);
    if (!service) {
        throw new AppError_1.default(400, "Service not found: " + serviceId);
    }
    const slot = yield slot_model_1.Slot.findById(slotId);
    if (!slot) {
        throw new AppError_1.default(400, "Slot does not exist");
    }
    //TODO: Validate slot availability and duration with service duration
    // if (slot.isBooked === "booked") {
    //   throw new AppError(400, "Slot is unavailable");
    // }
    const myBookings = yield booking_model_1.Booking.find({
        customer: customer._id,
        service: service._id,
        slot: slot._id,
    });
    if (myBookings.length > 0) {
        throw new AppError_1.default(400, "You have already booked the service in this slot");
    }
    //TODO: Update slot status to booked using transaction and rollback
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        slot.isBooked = "booked";
        yield slot.save();
        const transactionId = `TXN-${Date.now()}`;
        const modifiedPayload = {
            customer: customer === null || customer === void 0 ? void 0 : customer._id,
            service: serviceId,
            slot: slotId,
            vehicleType: vehicleType,
            vehicleBrand: vehicleBrand,
            vehicleModel: vehicleModel,
            manufacturingYear: manufacturingYear,
            registrationPlate: registrationPlate,
            transactionId,
        };
        // const result = (await Booking.create(modifiedPayload)).populate(
        //   "customer service slot"
        // );
        yield booking_model_1.Booking.create(modifiedPayload);
        const paymentData = {
            transactionId,
            price: service === null || service === void 0 ? void 0 : service.price,
            customerName: customer.name,
            customerEmail: customer.email,
            customerPhone: customer === null || customer === void 0 ? void 0 : customer.phone,
            customerAddress: customer === null || customer === void 0 ? void 0 : customer.address,
            startTime: slot === null || slot === void 0 ? void 0 : slot.startTime,
            serviceName: service === null || service === void 0 ? void 0 : service.name,
        };
        const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
        yield session.commitTransaction();
        yield session.endSession();
        return paymentSession;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate("customer service slot");
    return result;
});
const getSingleUserBookingsFromDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield user_model_1.User.findOne({ _id: customerId });
    if (!customer) {
        throw new AppError_1.default(404, "User not found");
    }
    const result = yield booking_model_1.Booking.find({
        customer: customerId,
    }).populate("customer service slot");
    return result;
});
const getSingleBookingFromDB = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findOne({
        _id: bookingId,
    }).populate("customer service slot");
    return result;
});
exports.BookingServices = {
    bookServiceIntoDB,
    getAllBookingsFromDB,
    getSingleUserBookingsFromDB,
    getSingleBookingFromDB,
};
