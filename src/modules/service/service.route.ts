import { Router } from "express";
import authenticateRoute from "../../middlewares/authenticateRoute";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "../slot/slot.validation";
import { User_roles } from "../user/user.constant";
import { ServiceControllers } from "./service.controller";
import { ServiceValidations } from "./service.validation";

const router = Router();

router.post(
  "/",
  authenticateRoute(User_roles.admin),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService
);

router.get("/:id", ServiceControllers.getSingleService);

router.put(
  "/:id",
  authenticateRoute(User_roles.admin),
  ServiceControllers.updateService
);

router.get(
  "/", ServiceControllers.getAllServices
);

router.delete(
  "/:id",
  authenticateRoute(User_roles.admin),
  ServiceControllers.deleteService
);

router.post(
  "/slots",
  authenticateRoute(User_roles.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  ServiceControllers.createSlot
);

export const ServiceRoutes = router;
