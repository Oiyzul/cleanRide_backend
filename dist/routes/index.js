"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_route_1 = require("../modules/booking/booking.route");
const service_route_1 = require("../modules/service/service.route");
const user_route_1 = require("../modules/user/user.route");
const slot_route_1 = require("../modules/slot/slot.route");
const me_route_1 = require("../modules/me/me.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
