import { catchAsync } from "../../utils/catchAsync";
import { ServiceServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.saveServiceIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Service created successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
};
