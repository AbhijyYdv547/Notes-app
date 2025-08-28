import express from "express";
import { loginController, myInfoController, signupController, googleLogin } from "../controllers/authController.js";
import { middleware } from "../middlewares/userMiddleware.js";


const router = express.Router();

router.post("/register", signupController );

router.post("/login", loginController);

router.post("/google",googleLogin)

router.get("/me",middleware,myInfoController)

export default router;

