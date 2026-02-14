import express from "express"
import { usermodel } from "../models/Schema.js"
import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";
// dotenv.config();

console.log("Google login route loaded")
const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/", async (req, res) => {
  try {
     console.log("Google login route hit")
     console.log("Backend CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
    const { token } = req.body;
console.log("Received token:", token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, sub, picture } = payload;

    let user = await usermodel.findOne({ usermail: email });

    if (!user) {
      user = await usermodel.create({
        fullname: name,
        usermail: email,
        googleid: sub,
        avtar: picture,
      });
    }

    res.status(200).json({
      message: "Google login successful",
      user,
    });

  } catch (error) {
    console.log("Google login error", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

export default router