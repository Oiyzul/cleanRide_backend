import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { User_roles } from "../user/user.constant";
import { MyControllers } from "./me.controller";
import authenticateRoute from "../../middlewares/authenticateRoute";

const router = Router();

router.get(
  "/",
  authenticateRoute(User_roles.user),
  MyControllers.getMyBookings
);

export const MyRoutes = router;
