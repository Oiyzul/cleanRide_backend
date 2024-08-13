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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For password hashing
const user_constant_1 = require("./user.constant");
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        select: 0,
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10,11}$/,
    },
    role: {
        type: String,
        enum: Object.keys(user_constant_1.User_roles),
        required: true,
        default: "user",
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true });
// Pre-save hook for password hashing
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcryptjs_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
        }
        next();
    });
});
userSchema.set('toJSON', {
    transform: (doc, _a) => {
        var { __v, password } = _a, rest = __rest(_a, ["__v", "password"]);
        return rest;
    }
});
userSchema.set('toObject', {
    transform: (doc, _a) => {
        var { __v, password } = _a, rest = __rest(_a, ["__v", "password"]);
        return rest;
    }
});
exports.User = mongoose_1.default.model("User", userSchema);
