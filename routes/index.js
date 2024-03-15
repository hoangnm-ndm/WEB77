import { Router } from "express";
import productRouter from "./product.js";
import userRouter from "./user.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
