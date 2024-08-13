"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Routes
app.use('/api', routes_1.default);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
