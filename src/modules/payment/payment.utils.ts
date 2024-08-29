import axios from "axios";
import AppError from "../../errors/AppError";
import Env from "../../config";

export const initiatePayment = async (paymentData: any) => {
  const {
    transactionId,
    price,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    startTime,
    serviceName,
  } = paymentData;
  try {
    const response = await axios.post(Env.payment_url as string, {
      store_id: Env.store_id,
      signature_key: Env.signature_key,
      tran_id: transactionId,
      success_url: `http://localhost:${Env.port}/api/payment/confirmation?transactionId=${transactionId}&status=success`,
      fail_url: `http://localhost:${Env.port}/api/payment/confirmation?status=fail`,
      cancel_url: "http://localhost:5173/services",
      amount: price,
      currency: "BDT",
      desc: serviceName + " is booked at " + startTime,
      cus_name: customerName,
      cus_email: customerEmail,
      cus_phone: customerPhone,
      cus_add1: customerAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_country: "N/A",
      cus_postcode: "",
      payment_method: "online",
      type: "json",
    });

    return response.data;
  } catch (err) {
    throw new AppError(401, "Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(Env.payment_verification_url!, {
      params: {
        store_id: Env.store_id,
        signature_key: Env.signature_key,
        request_id: tnxId,
        type: "json",
      },
    });

    return response.data;
  } catch (err) {
    throw new AppError(401, "Payment validation failed!");
  }
};
