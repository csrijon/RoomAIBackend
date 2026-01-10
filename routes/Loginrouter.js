import express from "express";
const router = express.Router();

router.post("/",(req,res)=>{
    const { usermail, loginpass } = req.body;
    console.log("Login attempt:", usermail, loginpass);
    res.send("login route working")
})



export default router;