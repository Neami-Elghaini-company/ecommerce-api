const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");
const currentDate = new Date();

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "filed must a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
        },
        token: {
            type: String,
        },
        role: {
            type: String,
            enum: [userRoles.ADMIN, userRoles.SELLER, userRoles.USER],
            default: userRoles.USER,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
