
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Roomaiapp")
    .then(() => {
        console.log("mongodb connected successfully")
    }).catch((err) => {
        console.log("mongodb not connected", err)
    })

const SignupSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    usermail: {
        type: String,
        required: true,
        trim: true
    },
    signuppass: {
        type: String,
        required: true,
        trim: true
    }
})

export const signupModel = mongoose.model("signupModel", SignupSchema);