import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { User_roles } from "../user/user.constant";
import { BookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";

const router = Router();

router.post("/", auth(User_roles.user), validateRequest(BookingValidations.createBookingValidationSchema), BookingControllers.bookService);

router.get("/", auth(User_roles.admin), BookingControllers.getAllBookins);

export const BookingRoutes = router;
