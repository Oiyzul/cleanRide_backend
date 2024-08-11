import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router()

router.post('/signup', UserControllers.signup)
router.post('/login', UserControllers.login)

export const UserRoutes = router