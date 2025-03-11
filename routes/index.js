import express from "express";
const router = express.Router();
import nodemailer from 'nodemailer';

// POST to add a visit
// router.post("/visit/:url", async (req, res) => {
//   try {
//     //const result = await addVisit(req.params.url);
//     res.status(201).json({
//       success: true,
//       payload: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

const EMAIL_COOLDOWN_PERIOD = 30000; // 30 seconds
let lastEmailSent = 0;

// POST to add an email
router.post("/email/:email", async (req, res) => {
    // Validate email
    const email = req.params.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }
    if(Date.now() - lastEmailSent < EMAIL_COOLDOWN_PERIOD){
      return res.status(429).json({
        success: false,
        message: "Too many requests, please wait a minute before trying again",
      });
    }
    const success = send_email("New Pre-Order", `'${req.params.email}' has pre-ordered a new smart stick!`);
    if (success){
      lastEmailSent = Date.now();
      return res.status(201).json({
        success: success,
        message: "Email sent successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error sending email",
      });
    }
});




async function send_email(subject, message) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.email,
      pass: process.env.password
    },
    tls: {
      rejectUnauthorized: false,
      secureProtocol: 'TLSv1_2_method' // You can try TLSv1_2_method or TLSv1_3_method
  }
  });

  const mailOptions = {
    from: process.env.emailFrom,
    to: process.env.emailDest,
    subject: subject,
    text: message
  };

  //console.log("About to send email to: ", process.env.emailDest, " From: ", process.env.email)
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
    return true
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    return false
  }
}



export default router;
