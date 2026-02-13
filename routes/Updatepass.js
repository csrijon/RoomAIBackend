import express from "express";

const router = express.Router();

router.patch("/", (req, res) => {
    // const userid = req.params.id
    const {passowrds} = req.body
    console.log("update pass attempt for user:", passowrds);
    
    res.status(200).json({ success: true, message: 'Password updated successfully', passowrds });
})

export default router; 