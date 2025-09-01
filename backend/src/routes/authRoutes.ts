import express from "express";
import { loginRequestOtpController, loginVerifyOtpController, myInfoController, signupRequestOtpController, signupVerifyOtpController } from "../controllers/authController.js";
import { middleware } from "../middlewares/userMiddleware.js";


const router = express.Router();

router.post("/signup/request-otp", signupRequestOtpController);
router.post("/signup/verify-otp", signupVerifyOtpController);

// Login
router.post("/login/request-otp", loginRequestOtpController);
router.post("/login/verify-otp", loginVerifyOtpController);

router.get("/me",middleware,myInfoController)

export default router;

