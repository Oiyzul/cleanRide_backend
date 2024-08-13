"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWT = decodeJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function decodeJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        return decoded;
    }
    catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}
