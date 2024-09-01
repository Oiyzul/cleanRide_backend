"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_route_1 = require("../modules/booking/booking.route");
const service_route_1 = require("../modules/service/service.route");
const user_route_1 = require("../modules/user/user.route");
const slot_route_1 = require("../modules/slot/slot.route");
const me_route_1 = require("../modules/me/me.route");
const payment_route_1 = require("../modules/payment/payment.route");
const auth_route_1 = require("../modules/auth/auth.route");
const review_route_1 = require("../modules/review/review.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/services",
        route: service_route_1.ServiceRoutes,
    },
    {
        path: "/slots",
        route: slot_route_1.SlotRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/my-bookings",
        route: me_route_1.MyRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/reviews",
        route: review_route_1.ReviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
