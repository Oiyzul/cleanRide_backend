import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing
import { User_roles } from "./user.constant";
import Env from "../../config";
import { TUser, UserModel } from "./user.interface";

const userSchema = new mongoose.Schema<TUser, UserModel>(
  {
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
      enum: Object.keys(User_roles),
      required: true,
      default: "user",
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(Env.bcrypt_salt_round)
    );
  }
  next();
});

userSchema.set('toJSON', {
  transform: (doc, {__v, password, ...rest}) => rest
})
userSchema.set('toObject', {
  transform: (doc, {__v, password, ...rest}) => rest
})

export const User = mongoose.model<TUser>("User", userSchema);
