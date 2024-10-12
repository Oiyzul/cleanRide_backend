import { catchAsync } from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import { ServiceServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  console.log(req.body)
  const result = await ServiceServices.saveServiceIntoDB(req.body);

  sendRes({
    res,
    message: "Service created successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getSingleServiceFromDB(req.params.id, res);
  
  sendRes({
    res,
    message: "Service retrived successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServiceFromDB(res);
  
  sendRes({
    res,
    message: "Services retrived successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const result = await ServiceServices.updateServiceIntoDB(
    req.params.id,
    req.body
  );
  sendRes({
    res,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const result = await ServiceServices.deleteServiceFromDB(req.params.id);
  sendRes({
    res,
    message: "Service deleted successfully",
    data: result,
  });
});

const createSlot = catchAsync(async (req, res) => {
  const result = await ServiceServices.saveSlotIntoDB(req.body, res);

  sendRes({
    res,
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
