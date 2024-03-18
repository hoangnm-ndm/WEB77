import { Router } from "express";
import productRouter from "./product.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
