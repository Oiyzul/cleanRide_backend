import Env from "../../config";
import { TBooking } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";

const confirmPayment = async (transactionId: string, status: string) => {
  const verifiedResponse = await verifyPayment(transactionId);

  let booking: TBooking | null,
    success = false;

  if (verifiedResponse && verifiedResponse.pay_status === "Successful") {
    booking = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
        paymentConfirmationDate: new Date(),
      }
    );
    success = true;
  } else {
    success = false;
  }
  const {
    mer_txnid,
    cus_name,
    cus_email,
    cus_phone,
    desc,
    cus_add1,
    pay_status,
    payment_type,
    currency_merchant,
    amount_currency,
  } = verifiedResponse;
  // console.log(booking, verifiedResponse);

  // const filePath = join(__dirname, "../../views/confirmaion.html");
  // let template = readFileSync(filePath, "utf8");

  // template = template.replace("{{message}}", message);

  const successTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #080808; color: #fafafa; }
          h1 { margin-bottom: 50px; }
          span { font-weight: semi-bold }
          a { text-decoration: none; font-weight: bold; color: #fff }
          .container { max-width: 1280px; margin-inline: auto; min-height:100vh; display: flex; flex-direction: column; justify-items: center; justify-content: center;}
          .wrapper { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1em;}
          .card {width: 340px; max-height: 300px; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);}
          .bold { font-weight: bold }
          table { width: 100%; border-collapse: collapse; overflow-x:scroll }
          table, th, td { border: 1px solid #333; text-transform: capitalize }
          th, td { padding: 8px; text-align: left; }
          .table { padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); margin-block: 40px;}
          .flex { display: flex; align-items:center; justify-content: space-between;}
          @media only screen and (max-width: 768px) {
          .card { width:100%;}
          }
        </style>
      </head>
      <body>
      <div class="container">
      <div class=flex>
      <h1>Payment Confirmation: ${pay_status}</h1>
      <a href=${Env.cancel_url}>Home</a>
      </div>
      <div class="wrapper">
          <div class="card">
            <h2>Transaction Details</h2>
            <p>Booking ID: ${booking?._id}</p>
            <p>Transaction ID: ${mer_txnid}</p>
            <p>Total Amount: ${currency_merchant} ${amount_currency}</p>
            <p>Description: ${desc}.</p>
          </div>
          <div class="card">
            <h3>Customer</h3>
            <p>Name: ${cus_name}</p>
            <p>Email: ${cus_email}</p>
            <p>Phone: ${cus_phone}</p>
            <p>Address: ${cus_add1}</p>
          </div>       
          <div class="card">
             <h3>Status</h3>
             <p>Payment Status: <span>${booking?.paymentStatus}</span></p>
             <p>Payment Type: <span>${payment_type}</span></p>
             <p>Paid At: <span>${booking?.paymentConfirmationDate.toLocaleString()}</span></p>
            </div>
      </div>
      <div class='table'>
          <h3>Vehicle</h3>
            <table>
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Model</th>
                  <th>Brand</th>
                  <th>Manufactured</th>
                  <th>Registration</th>
                </tr>
              </thead>
              <tbody>
                <tr> 
                  <td>${booking?.vehicleType}</td>
                  <td>${booking?.vehicleModel}</td>
                  <td>${booking?.vehicleBrand}</td>
                  <td>${booking?.manufacturingYear}</td>
                  <td>${booking?.registrationPlate}</td>
              </tbody>
            </table>                
        </div>
      </body>
    </html>
  `;
  const failTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; background: #080808; color: #fafafa; display: flex; flex-direction: column; justify-items: center; justify-content: center;}
          h1 { margin-bottom: 50px; }
          .container { max-width: 1280px; margin-inline: auto; height:100vh; margin-top: 100px }
          a {
          text-decoration: none;
          color: #fff;
          }
        </style>
      </head>
      <body>
      <div class="container">  
      <h1>Payment Confirmation: Failed</h1>
      <p>Failed to process the payment. Please try again later.</p>
      <a href=${Env.cancel_url}> Back to Home </a>
      </div>
      </body>
    </html>
  `;

  return success ? successTemplate : failTemplate;
};

export const PaymentServices = {
  confirmPayment,
};
