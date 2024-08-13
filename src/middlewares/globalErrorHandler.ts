import { ErrorRequestHandler, NextFunction, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorMessages } from "../interface/error.interface";
import Env from "../config";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err?.statusCode;
  let message = err?.message || "Something went wrong!";
  
  let errorMessages: TErrorMessages = [
    {
      path: "",
      message: err?.message || "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } 
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    errorMessages = simplifiedError.errorMessages
  } else if(err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    errorMessages = simplifiedError.errorMessages
  }

  console.log("duplicate err", err.stack, err.message, err.errmsg);

  return res.json({
    success: false,
    ...(statusCode && { statusCode: statusCode }),
    message,
    errorMessages,
    stack: Env.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
