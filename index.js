import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();
const app = express();

const { PORT, DB_URI } = process.env;

app.use(express.json()); // Middleware

// ? Phương thức connect với tham số connect string
await mongoose.connect(DB_URI).then(() => {
  console.log("connect to database successfully");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
