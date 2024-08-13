import mongoose from "mongoose";
import {
  TErrorMessages,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages,
  };
};

export default handleValidationError;
