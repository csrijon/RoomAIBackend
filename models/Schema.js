import mongoose from "mongoose";

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

const userschema = new mongoose.Schema({
    fullname:String,
    usermail:String,
    googleid:String,
    avtar:String
})


export const usermodel = mongoose.model("usermodel", userschema);
export const signupModel = mongoose.model("signupModel", SignupSchema);
export const otpModel = mongoose.model("otpModel", otpSchema);