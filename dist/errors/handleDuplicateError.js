"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorMessages = [
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
exports.default = handleDuplicateError;
