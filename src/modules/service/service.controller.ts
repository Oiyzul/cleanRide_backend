import { catchAsync } from "../../utils/catchAsync";
import { ServiceServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.saveServiceIntoDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Service created successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getSingleServiceFromDB(req.params.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServiceFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Services retrieved successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const result = await ServiceServices.updateServiceIntoDB(
    req.params.id,
    req.body
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const result = await ServiceServices.deleteServiceFromDB(req.params.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Service deleted successfully",
    data: result,
  });
});

const createSlot = catchAsync(async (req, res) => {
  const result = await ServiceServices.saveSlotIntoDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Slots created successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
  createSlot,
};
