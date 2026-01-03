const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || "member",
    });
    // ===== EMAIL VERIFICATION OTP =====
const otp = Math.floor(100000 + Math.random() * 900000).toString();

const hashedOtp = crypto
  .createHash("sha256")
  .update(otp)
  .digest("hex");

user.emailVerifyOtp = hashedOtp;
user.emailVerifyOtpExpires = Date.now() + 10 * 60 * 1000; // 10 min
await user.save();

// Send verification email
await sendEmail({
  to: email,
  subject: "Verify your email",
  html: `
    <h2>Email Verification</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>This OTP is valid for 10 minutes.</p>
  `,
});


    // ✅ TOKEN CONTAINS ROLE
    // const token = jwt.sign(
      // { id: user.id, role: user.role },
      // process.env.JWT_SECRET,
      // { expiresIn: "7d" }
    // );

    // res.json({
      // token,
      // user: {
        // id: user.id,
        // name: user.name,
        // email: user.email,
        // role: user.role,
      // },
    // });
        res.status(201).json({
            msg: "Registration successful. Please verify your email. OTP snet to email",
            email,
});


  } catch (err) {
    console.error("Register error:", err);

    res.status(500).json({ msg: "Server error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


if (!user.isVerified) {
  return res
    .status(403)
    .json({ msg: "Please verify your email first" });
}

    

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // ✅ TOKEN CONTAINS ROLE
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.resetOtp = hashedOtp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // ⏱ 10 minutes
    await user.save();

    // Send email
    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
      `,
    });

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.resetOtp) {
      return res.status(400).json({ msg: "Invalid request" });
    }

    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      user.resetOtp !== hashedOtp ||
      user.resetOtpExpires < Date.now()
    ) {
      return res.status(400).json({ msg: "OTP invalid or expired" });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to reset password" });
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      user.emailVerifyOtp !== hashedOtp ||
      user.emailVerifyOtpExpires < Date.now()
    ) {
      return res.status(400).json({ msg: "OTP invalid or expired" });
    }

    user.isVerified = true;
    user.emailVerifyOtp = null;
    user.emailVerifyOtpExpires = null;
    await user.save();

    res.json({ msg: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Email verification failed" });
  }
};
