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
exports.MyControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendRes_1 = __importDefault(require("../../utils/sendRes"));
const me_service_1 = require("./me.service");
const getMyBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b[1];
    const result = yield me_service_1.MyServices.getAllMyBookinsFromDB(token);
    (0, sendRes_1.default)({
        res,
        message: "My bookings retrieved successfully",
        data: result,
    });
}));
exports.MyControllers = {
    getMyBookings,
};
