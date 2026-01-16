import express from "express";
import { otpModel } from "../models/Schema.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { usermail, otp } = req.body;

    const otprecord = await otpModel.findOne({ usermail, otp });

    if (!otprecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;