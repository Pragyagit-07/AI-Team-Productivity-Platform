// // for localuse
// // const nodemailer = require("nodemailer");

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },

// // });

// // module.exports = async ({ to, subject, html }) => {
// //   try{
// //   await transporter.sendMail({
// //     from: `"AI Team Platform" <${process.env.EMAIL_USER}>`,
// //     to,
// //     subject,
// //     html,
// //   });
// // } catch (err){
// //   console.error("send email error:", err );
// //   throw err;
// // }
// // };

// // For production
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false, // TLS
//   auth: {
//     user: "apikey",
//     pass: process.env.Brevo_API_KEY,
//   },
// });

// module.exports = async ({ to, subject, html }) => {
//   try {
//     await transporter.sendMail({
//       from: `"AI Team Platform" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });
//   } catch (error) {
//     console.error(" Brevo email error:", error);
//     throw error;
//   }
// };



const SibApiV3Sdk = require("sib-api-v3-sdk");

// Get Brevo client
const client = SibApiV3Sdk.ApiClient.instance;

// Add API key
client.authentications["api-key"].apiKey = process.env.Brevo_API_KEY;

// Create API instance
const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = async ({ to, subject, html }) => {
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_FROM,
        name: "AI Team Platform",
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      htmlContent: html,
    });

    console.log("✅ OTP email sent:", response.messageId);
    return true;
  } catch (error) {
    console.error("❌ Brevo API email error:", error);
    throw error;
  }
};
