import AppError from "../../errors/AppError";
import { decodeJWT } from "../../utils/decodeJWT";
import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";
import { User } from "../user/user.model";
import { TBookingPayload } from "./booking.interface";
import { Booking } from "./booking.model";

const bookServiceIntoDB = async (payload: TBookingPayload, token: string) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = payload;

  const decodedToken = decodeJWT(token);

  const customer = await User.findOne({ email: decodedToken?.email });

  if (!customer) {
    throw new AppError(400, "User not found");
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new AppError(400, "Service not found: " + serviceId);
  }

  const slot = await Slot.findById(slotId);
  
  if (!slot) {
    throw new AppError(400, "Slot does not exist");
  }
  //TODO: Validate slot availability and duration with service duration

  // if (slot.isBooked === "booked") {
  //   throw new AppError(400, "Slot is unavailable");
  // }

  const myBookings = await Booking.find({
    customer: customer._id,
    service: service._id,
    slot: slot._id,
  });
  
  if (myBookings.length > 0) {
    throw new AppError(400, "You have already booked the service in this slot");
  }

  //TODO: Update slot status to booked using transaction and rollback

  slot.isBooked = "booked";

  await slot.save();

  const modifiedPayload = {
    customer: customer?._id,
    service: serviceId,
    slot: slotId,
    vehicleType: vehicleType,
    vehicleBrand: vehicleBrand,
    vehicleModel: vehicleModel,
    manufacturingYear: manufacturingYear,
    registrationPlate: registrationPlate,
  };

  const result = (await Booking.create(modifiedPayload)).populate(
    "customer service slot"
  );
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("customer service slot");
  return result;
};

export const BookingServices = {
  bookServiceIntoDB,
  getAllBookingsFromDB,
};
