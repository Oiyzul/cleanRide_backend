import { ZodError, ZodIssue } from "zod";
import {
  TErrorMessages,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  //@ts-ignore
  const errorMessages: TErrorMessages = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path,
      message: issue.message,
    };
  });

  const statusCode = 400;

  const stack = err.stack as string;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages
  };
};

export default handleZodError;
