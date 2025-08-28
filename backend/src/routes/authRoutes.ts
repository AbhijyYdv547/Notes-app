import express from "express";
import { myInfoController, googleLogin, reqOtpController, verifyOtpController } from "../controllers/authController.js";
import { middleware } from "../middlewares/userMiddleware.js";


const router = express.Router();

router.post("/request-otp", reqOtpController );

router.post("/verify-otp", verifyOtpController);

router.post("/google",googleLogin)

router.get("/me",middleware,myInfoController)

export default router;

