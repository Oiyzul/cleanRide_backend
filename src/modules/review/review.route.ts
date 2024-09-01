import { Router } from "express";
import authenticateRoute from "../../middlewares/authenticateRoute";
import validateRequest from "../../middlewares/validateRequest";
import { User_roles } from "../user/user.constant";
import { ReviewControllers } from "./review.controller";
import { ReviewValidations } from "./review.validation";

const router = Router();

router.post(
  "/",
  authenticateRoute(User_roles.user),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.addReview
);

router.get(
  "/:customerId",
  authenticateRoute(User_roles.admin, User_roles.user),
  ReviewControllers.getSingleUserReviews
);

router.get(
  "/",
  authenticateRoute(User_roles.admin, User_roles.user),
  ReviewControllers.getAllReviews
);

export const ReviewRoutes = router;
