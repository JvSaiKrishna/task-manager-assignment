import express from "express"
import { createAccount, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup",createAccount)
router.post("/login",login)

export default router