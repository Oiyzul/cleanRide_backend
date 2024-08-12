import { decodeJWT } from "../../utils/decodeJWT";
import { Booking } from "../booking/booking.model";
import { User } from "../user/user.model";

const getAllMyBookinsFromDB = async (token: string) => {
  const customer = decodeJWT(token);
  const user = await User.findOne({ email: customer?.email });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await Booking.find({ customer: user?._id })
    .select("-customer")
    .populate("service slot");
  return result;
};

export const MyServices = {
  getAllMyBookinsFromDB,
};
