import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.put("/:userId", UserControllers.updateUser);

router.get("/:userId", UserControllers.getSingleUser);

router.get("/", UserControllers.getAllUsers);

export const UserRoutes = router;
