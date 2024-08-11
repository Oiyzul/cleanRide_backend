import { Router } from "express";
import { ServiceControllers } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { User_roles } from "../user/user.constant";

const router = Router();

router.post("/", auth(User_roles.admin), ServiceControllers.createService);
router.get("/:serviceId",  ServiceControllers.getSingleService);
router.get("/",  ServiceControllers.getAllServices);

export const ServiceRoutes = router;
