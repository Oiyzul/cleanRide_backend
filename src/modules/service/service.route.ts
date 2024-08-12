import { Router } from "express";
import { ServiceControllers } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { User_roles } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";
import { SlotValidations } from "../slot/slot.validation";

const router = Router();

router.post("/", auth(User_roles.admin), validateRequest(ServiceValidations.createServiceValidationSchema), ServiceControllers.createService);
router.get("/:id", ServiceControllers.getSingleService);
router.put("/:id", auth(User_roles.admin), ServiceControllers.updateService);
router.get("/", ServiceControllers.getAllServices);
router.delete("/:id", auth(User_roles.admin), ServiceControllers.deleteService);
router.post('/slots', auth(User_roles.admin), validateRequest(SlotValidations.createSlotValidationSchema), ServiceControllers.createSlot)

export const ServiceRoutes = router;
