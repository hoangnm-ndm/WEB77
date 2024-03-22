import { Router } from "express";
import productRouter from "./product.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/auth", productRouter);

export default router;
