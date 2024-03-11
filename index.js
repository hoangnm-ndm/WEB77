import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
const app = express();
const PORT = 8000;

app.use(express.json()); // Middleware

// phương thức connect với tham số connect string
await mongoose.connect("mongodb://localhost:27017/mindx-fullstack").then(() => {
  console.log("connect to database successfully");
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    // Validation
    if (!name || !price || !description) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }
    const data = await Product.create({ name, price, description });
    if (data) {
      return res.status(201).json({
        message: "Create product successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Create product failed",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const data = await Product.find({});
    if (data) {
      return res.status(201).json({
        message: "Get product successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Get product failed",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (data) {
      return res.status(201).json({
        message: "Get product successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Get product failed",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});
app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
