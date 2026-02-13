
import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/Roomaiapp")
//     .then(() => {
//         console.log("mongodb connected successfully")
//     }).catch((err) => {
//         console.log("mongodb not connected", err)
//     })

const SignupSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    usermail: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    signuppass: {
        type: String,
        required: true,
        trim: true
    }
})

const otpSchema = new mongoose.Schema({
    otp:{
        type: Number,
        required: true,
        trim: true
    },
    usermail:{
        type: String,
        required: true,
        trim: true
    },
    exptime:{
        type: Date,
        required: true,
        default:Date.now,
        expires:300,
    }
})

export const signupModel = mongoose.model("signupModel", SignupSchema);
export const otpModel = mongoose.model("otpModel", otpSchema);