import { Router } from "express";
import { UserControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";


const router = Router();

router.post(
  "/signup",
  validateRequest(AuthValidations.createUserValidationSchema),
  UserControllers.signup
);
router.post(
  "/login",
  validateRequest(AuthValidations.loginValidaitonSchema),
  UserControllers.login
);


export const AuthRoutes = router;
