import mongoose from "mongoose";
import {
  TErrorMessages,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid Object ID",
    errorMessages,
  };
};

export default handleCastError;
