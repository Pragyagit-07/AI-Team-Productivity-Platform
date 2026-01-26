import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OrgUser from "../models/OrgUser.js";

export const orgUserLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await OrgUser.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,           // ADMIN or MEMBER
      orgId: user.organizationId,
      branchId: user.branchId,
      type: "ORG_USER",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      orgId: user.organizationId,
      branchId: user.branchId,
    },
  });
};
