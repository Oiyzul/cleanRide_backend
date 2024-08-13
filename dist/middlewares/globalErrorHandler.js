"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const config_1 = __importDefault(require("../config"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
    let message = (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong!";
    let errorMessages = [
        {
            path: "",
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        errorMessages = simplifiedError.errorMessages;
    }
    console.log("duplicate err", err.stack, err.message, err.errmsg);
    return res.json(Object.assign(Object.assign({ success: false }, (statusCode && { statusCode: statusCode })), { message,
        errorMessages, stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null }));
};
exports.default = globalErrorHandler;
