import { Router } from "express";
import { ServiceControllers } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { User_roles } from "../user/user.constant";

const router = Router();

router.post("/", auth(User_roles.admin), ServiceControllers.createService);
router.get("/:id", ServiceControllers.getSingleService);
router.put("/:id", auth(User_roles.admin), ServiceControllers.updateService);
router.get("/", ServiceControllers.getAllServices);
router.delete("/:id", auth(User_roles.admin), ServiceControllers.deleteService);

export const ServiceRoutes = router;
