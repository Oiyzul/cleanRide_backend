import { Router } from "express";
import { BookingRoutes } from "../modules/booking/booking.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { UserRoutes } from "../modules/user/user.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { MyRoutes } from "../modules/me/me.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/my-bookings",
    route: MyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
