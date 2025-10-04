import express from "express";
import { getUserProfile } from "./middleware.js";
import { AdminController } from "./controller.js";
const router = express.Router();

router.get("/admin",getUserProfile,AdminController);

export default router;
