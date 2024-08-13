"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    //@ts-ignore
    const errorMessages = err.issues.map((issue) => {
        return {
            path: issue.path,
            message: issue.message,
        };
    });
    const statusCode = 400;
    const stack = err.stack;
    return {
        statusCode,
        message: "Validation Error",
        errorMessages
    };
};
exports.default = handleZodError;
