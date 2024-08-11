import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router()

router.post('signup', UserControllers.signup)

export const UserRoutes = router