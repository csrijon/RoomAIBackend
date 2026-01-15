import express from 'express';
const router = express.Router();
import { signupModel } from '../models/Schema.js';


let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

router.post('/', async (req, res) => {
    const { usermail } = req.body;
    if (regexEmail.test(usermail)) {
        console.log('Valid email format');
    } else {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    console.log('OTP check attempt for:', usermail);

    const user = await signupModel.findOne({ usermail });
    console.log('User found for OTP check:', user);
    if (!user) {
        return res.status(404).json({ success: false, message: 'Email not registered' });
    }
    let otp = genotp();
    console.log("Generated OTP for user:", otp);
    res.status(200).json({ success: true, message: 'OTP can be sent to this email', usermail,otp });
}
);

const genotp = () => {
    let otp = Math.floor(10000 + Math.random() * 90000);
    return otp;
}
export default router;