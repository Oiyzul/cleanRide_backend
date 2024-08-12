import jwt, { JwtPayload } from "jsonwebtoken";
import { TBooking, TBookingPayload } from "./booking.interface";
import { Booking } from "./booking.model";
import Env from "../../config";
import { User } from "../user/user.model";
import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";
import { response } from "express";
import { get } from "mongoose";
import { decodeJWT } from "../../utils/decodeJWT";

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
  console.log(customer);
  const service = await Service.findById(serviceId);
  console.log("service", service);
  const slot = await Slot.findById(slotId);
  console.log("slot", slot);
  if (!slot || slot.isBooked) {
    // return response.status(400).json({
    //   success: false,
    //   statusCode: 400,
    //   message: "Slot is unavailable or does not exist",
    // });
    throw new Error("Slot is unavailable or does not exist");
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
