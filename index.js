import express from "express"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { signupModel } from "./models/Schema.js"
import loginrouter from "./routes/Loginrouter.js"
import otpsender from "./routes/otpsender.js"
import otpchecker from "./routes/otpchecker.js"
import Updatepass from "./routes/Updatepass.js"
import Googlelogin from "./routes/Googlelogin.js"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();


const app = express()
const port = process.env.PORT

mongoose.connect("mongodb://localhost:27017/Roomaiapp", {
  autoIndex: true,
})
  .then(() => {
    console.log("mongodb connected successfully")
  }).catch((err) => {
    console.log("mongodb not connected", err)
  })
app.use(cors())
app.use(express.json())

app.use("/login", loginrouter)
app.use("/otpsender", otpsender)
app.use("/otpchecker", otpchecker)
app.use("/updatepass", Updatepass)
app.use("/googlelogin", Googlelogin)

app.get("/", (req, res) => {
  res.send("hello guys")
})
app.post("/signup", async (req, res) => {
  try {
    const { fullname, usermail, signuppass } = req.body

    const existmail = await signupModel.findOne({ usermail })

    if (existmail) {
      return res.status(400).json({ message: "email already exists" })
    }
    const hashpass = await bcrypt.hash(signuppass, 10)

    const signupdata = new signupModel({
      fullname,
      usermail,
      signuppass: hashpass
    })

    await signupdata.save()
    return res.status(201).json({ message: "data saved successfully" })
  } catch (error) {
    console.log("error", error)
    res.json({ success: false, message: "data not saved" })
  }
})

app.listen(port, "0.0.0.0", () => {
  console.log(`app is running ${port}`)
});
