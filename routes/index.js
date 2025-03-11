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

// POST to add an email
router.post("/email/:email", async (req, res) => {
  try {
    const success = send_email("New Pre-Order", `'${req.params.email}' has pre-ordered a new smart stick!`);
    res.status(201).json({
      success: success,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
