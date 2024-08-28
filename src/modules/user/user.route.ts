import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.signup
);
router.post(
  "/login",
  validateRequest(UserValidations.loginValidaitonSchema),
  UserControllers.login
);
router.put('/:userId', UserControllers.updateUser)

router.get('/', UserControllers.getAllUsers)

export const UserRoutes = router;
