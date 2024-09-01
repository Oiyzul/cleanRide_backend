"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const user_constant_1 = require("../user/user.constant");
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const authenticateRoute_1 = __importDefault(require("../../middlewares/authenticateRoute"));
const router = (0, express_1.Router)();
router.post("/", (0, authenticateRoute_1.default)(user_constant_1.User_roles.user), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingControllers.bookService);
router.get("/:customerId", (0, authenticateRoute_1.default)(user_constant_1.User_roles.admin, user_constant_1.User_roles.user), booking_controller_1.BookingControllers.getSingleUserBookings);
router.get("/:bookingId", (0, authenticateRoute_1.default)(user_constant_1.User_roles.admin, user_constant_1.User_roles.user), booking_controller_1.BookingControllers.getSingleBooking);
router.get("/", (0, authenticateRoute_1.default)(user_constant_1.User_roles.admin), booking_controller_1.BookingControllers.getAllBookings);
exports.BookingRoutes = router;
