// for localuse
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },

// });

// module.exports = async ({ to, subject, html }) => {
//   try{
//   await transporter.sendMail({
//     from: `"AI Team Platform" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
// } catch (err){
//   console.error("send email error:", err );
//   throw err;
// }
// };

// For production
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: "apikey",
    pass: process.env.Brevo_API_KEY,
  },
});

module.exports = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"AI Team Platform" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("❌ Brevo email error:", error);
    throw error;
  }
};

