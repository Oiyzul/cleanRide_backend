import { catchAsync } from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import { ReviewServices } from "./review.service";

const addReview = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  const result = await ReviewServices.addReviewIntoDB(
    req.body,
    token as string
  );

  sendRes({
    res,
    message: "Review added successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  sendRes({
    res,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getSingleUserReviews = catchAsync(async (req, res) => {
  const { customerId } = req.params;

  const result = await ReviewServices.getSingleUserReviewsFromDB(customerId);

  sendRes({
    res,
    message: "All reivews retrieved successfully for this customer.",
    data: result,
  });
});

export const ReviewControllers = {
  addReview,
  getAllReviews,
  getSingleUserReviews,
};
