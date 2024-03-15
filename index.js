import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
const app = express();
const PORT = 8000;

app.use(express.json()); // Middleware

// ? Phương thức connect với tham số connect string
await mongoose.connect("mongodb://localhost:27017/mindx-fullstack").then(() => {
  console.log("connect to database successfully");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
