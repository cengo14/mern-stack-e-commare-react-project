const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)