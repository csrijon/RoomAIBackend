
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const MailSender = async ({ to, otp }) => {
    try {
        const sendmail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "chowdhurysrijon78@gmail.com",
                pass: process.env.APP_PASS
            }
        })

        const mailoptions = {
            from: 'chowdhurysrijon78@gmail.com',
            to: to,
            subject: "your reset password otp",
            text: `Your OTP is ${otp} . please do not share it with anyone`
        }
        await sendmail.sendMail(mailoptions)
        console.log("Mail sent successfully to:", to);
    } catch (error) {
        console.log("Error in mail sender:", error);
    }
}

export default MailSender;