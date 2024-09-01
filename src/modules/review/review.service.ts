import AppError from "../../errors/AppError";
import { decodeJWT } from "../../utils/decodeJWT";
import { User } from "../user/user.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const addReviewIntoDB = async (payload: TReview, token: string) => {
  const decodedToken = decodeJWT(token);

  const customer = await User.findOne({ email: decodedToken?.email });
  
  if (!customer) {
    throw new AppError(400, "User not found");
  }

  const result = await Review.create(payload);
  
  return result;
};

const getAllReviewsFromDB = async () => {
  const result = await Review.find().sort({ createdAt: -1 });
  console.log(result)
  return result;
};

const getSingleUserReviewsFromDB = async (customerId: string) => {
  const customer = await User.findById(customerId);

  if (!customer) {
    throw new AppError(404, "User not found");
  }

  const result = await Review.find({ customerId });

  return result;
};

export const ReviewServices = {
  addReviewIntoDB,
  getAllReviewsFromDB,
  getSingleUserReviewsFromDB,
};
