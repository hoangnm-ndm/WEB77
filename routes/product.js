import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  softRemoveProductById,
  updateProduct,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.delete("/delete/:id", removeProductById);
productRouter.put("/remove/:id", softRemoveProductById);
productRouter.put("/update/:id", updateProduct);

export default productRouter;
