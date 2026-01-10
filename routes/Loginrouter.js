import express from "express";
const router = express.Router();
import { signupModel } from "../models/Schema.js";

router.post("/", async (req, res) => {
    const { usermail, loginpass } = req.body;
    console.log("Login attempt:", usermail, loginpass);

    const user = await signupModel.findOne({ usermail, signuppass: loginpass });
    console.log("User found:", user);
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({ success: true, message: "login route working" });
})


export default router;