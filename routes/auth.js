import { Router } from "express";
import { register } from "../controllers/auth.js";
import { validateRegister } from "../middlewares/validateRegister.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, register);
// authRouter.post("/login");

export default authRouter;
