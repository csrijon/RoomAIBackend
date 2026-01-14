import express from 'express';
const router = express.Router();
import { signupModel } from '../models/Schema.js';

router.post('/', async (req, res) => {
    const { usermail } = req.body;
    console.log('OTP check attempt for:', usermail);

    const user = await signupModel.findOne({ usermail });
    console.log('User found for OTP check:', user);
    if (!user) {
        return res.status(404).json({ success: false, message: 'Email not registered' });
    }

    res.status(200).json({ success: true, message: 'OTP can be sent to this email' });
}

);
export default router;