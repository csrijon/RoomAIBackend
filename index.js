import express from "express"
import { signupModel } from "./models/Schema.js"


const app = express()
const port = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello guys")
})
app.post("/signup", async (req, res) => {
  try {
    const { fullname, usermail, signuppass } = req.body
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