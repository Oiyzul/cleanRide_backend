"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendRes_1 = __importDefault(require("../../utils/sendRes"));
const service_service_1 = require("./service.service");
const createService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield service_service_1.ServiceServices.saveServiceIntoDB(req.body);
    (0, sendRes_1.default)({
        res,
        message: "Service created successfully",
        data: result,
    });
}));
const getSingleService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.getSingleServiceFromDB(req.params.id, res);
    (0, sendRes_1.default)({
        res,
        message: "Service retrived successfully",
        data: result,
    });
}));
const getAllServices = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.getAllServiceFromDB(res);
    (0, sendRes_1.default)({
        res,
        message: "Services retrived successfully",
        data: result,
    });
}));
const updateService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.updateServiceIntoDB(req.params.id, req.body);
    (0, sendRes_1.default)({
        res,
        message: "Service updated successfully",
        data: result,
    });
}));
const deleteService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.deleteServiceFromDB(req.params.id);
    (0, sendRes_1.default)({
        res,
        message: "Service deleted successfully",
        data: result,
    });
}));
const createSlot = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.saveSlotIntoDB(req.body, res);
    (0, sendRes_1.default)({
        res,
        message: "Slots created successfully",
        data: result,
    });
}));
exports.ServiceControllers = {
    createService,
    getSingleService,
    getAllServices,
    updateService,
    deleteService,
    createSlot,
};
