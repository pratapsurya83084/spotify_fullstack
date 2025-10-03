import express from "express";
import { getUserProfile } from "../middleware/Auth.js";
const router = express.Router();

router.get("/admin",getUserProfile);

export default router;
