import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { validateLogin, validateRegister } from "../middlewares/validAuth.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);

export default authRouter;
