"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoutes = void 0;
const express_1 = require("express");
const user_constant_1 = require("../user/user.constant");
const me_controller_1 = require("./me.controller");
const authenticateRoute_1 = __importDefault(require("../../middlewares/authenticateRoute"));
const router = (0, express_1.Router)();
router.get("/", (0, authenticateRoute_1.default)(user_constant_1.User_roles.user), me_controller_1.MyControllers.getMyBookings);
exports.MyRoutes = router;
