import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { User_roles } from "../user/user.constant";
import { BookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import authenticateRoute from "../../middlewares/authenticateRoute";

const router = Router();

router.post(
  "/",
  authenticateRoute(User_roles.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.bookService
);

router.get(
  "/:customerId",
  authenticateRoute(User_roles.admin, User_roles.user),
  BookingControllers.getSingleUserBookings
);

router.get(
  "/:bookingId",
  authenticateRoute(User_roles.admin, User_roles.user),
  BookingControllers.getSingleBooking)
  
router.get(
  "/",
  authenticateRoute(User_roles.admin),
  BookingControllers.getAllBookings
);



export const BookingRoutes = router;
