import { Response } from "express";

type TResponse = {
  res: Response;
  message: string;
  token?: string;
  data: [] | {} | null;
};

const sendRes = (resData: TResponse) => {
  const { res, message, data } = resData;

  let isData;
  const isArray = Array.isArray(data);
  if (isArray) {
    isData = data.length > 0 ? true : false;
  } else {
    isData = Object.keys(data as object).length > 0 ? true : false;
  }

  const statusCode = isData ? 200 : 404;
  // console.log('from response', isData, "data", data);

  return res.status(statusCode).json({
    success: isData ? true : false,
    statusCode,
    message: isData ? message : "No data found",
    ...(resData.token && { toekn: resData.token }),
    ...(resData.data && { data: resData.data }),
  });
};

export default sendRes;
