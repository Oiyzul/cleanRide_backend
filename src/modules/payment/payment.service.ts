import { join } from "path";
import { readFileSync } from "fs";

import AppError from "../../errors/AppError";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";

const confirmPayment = async (transactionId: string, status: string) => {
  const verifiedResponse = await verifyPayment(transactionId);

  let result, message;

  if (verifiedResponse && verifiedResponse.pay_status === "Successful") {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
        paymentConfirmationDate: new Date(),
      }
    );

    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "../../views/confirmaion.html");
  let template = readFileSync(filePath, "utf8");

  template = template.replace("{{message}}", message);

  return template;
};

export const PaymentServices = {
  confirmPayment,
};
