import express from "express";
import { orgUserLogin } from "../controllers/orgAuth.controller.js";

const router = express.Router();
router.post("/login", orgUserLogin);

export default router;
