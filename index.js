import express from "express"
import { signupModel } from "./models/Schema.js"
import loginrouter from "./routes/Loginrouter.js"
import optchecker from "./routes/optchecker.js"


const app = express()
const port = 3000

app.use(express.json())

app.use("/login", loginrouter)
app.use("/optchecker", optchecker)

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

    const signupdata = new signupModel({
      fullname,
      usermail,
      signuppass
    })

    await signupdata.save()
    return res.status(201).json({ message: "data saved successfully" })
  } catch (error) {
    console.log("error", error)
    res.json({ success: false, message: "data not saved" })
  }
})

app.listen(port, () => {
  console.log(`app is running ${port}`)
})