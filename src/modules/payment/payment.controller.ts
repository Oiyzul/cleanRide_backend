import { catchAsync } from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";


const confirmation = catchAsync(async (req, res) => {
  const {transactionId, status} = req.query
  
  const result = await PaymentServices.confirmPayment(transactionId as string, status as  string);

  res.send(result)
});

export const PaymentControllers = {
  confirmation
};
