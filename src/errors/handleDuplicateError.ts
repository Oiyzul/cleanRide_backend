import {
  TErrorMessages,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: err.message,
    },
  ];
  
  return {
    message: err.message,
    errorMessages,
  };
};

export default handleDuplicateError;
