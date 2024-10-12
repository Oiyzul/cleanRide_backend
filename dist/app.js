"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const config_1 = __importDefault(require("./config"));
const imagekit_1 = __importDefault(require("imagekit"));
const app = (0, express_1.default)();
// Middleware to parse JSON request bodies
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", 'https://cleanridebd.netlify.app'], credentials: true }));
app.use(express_1.default.json());
const imagekit = new imagekit_1.default({
    urlEndpoint: config_1.default.imagekit_urlEndpoint,
    publicKey: config_1.default.imagekit_publicKey,
    privateKey: config_1.default.imagekit_privateKey,
});
// Routes
app.use("/api", routes_1.default);
//upload image with imagekit
// allow cross-origin requests
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.get("/api/image-upload", function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
