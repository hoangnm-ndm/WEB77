import express from "express";
const app = express();

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
const PORT = 8000;

app.use(express.json()); // Middleware

app.get("/san-pham", async (req, res) => {
  try {
    const { data } = await instance.get("/products");
    if (!data | (data.length === 0)) {
      return res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "Lấy sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.get("/san-pham/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = await instance.get(`/products/${id}`);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Lấy sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.post("/san-pham", async (req, res) => {
  try {
    const body = req.body;
    // Validation body
    if (!body.title || !body.price || !body.category) {
      return res.status(400).json({
        message: "Thiếu thông tin",
      });
    }
    const { data } = await instance.post(`/products`, body);
    if (!data) {
      return res.status(404).json({
        message: "Thêm sản phẩm không thành công!",
      });
    }
    return res.status(200).json({
      message: "Thêm sản phẩm thành công!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.patch("/san-pham/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    // Validation body
    const { data } = await instance.patch(`/products/${id}`, body);
    if (!data) {
      return res.status(404).json({
        message: "Cập nhật sản phẩm không thành công!",
      });
    }
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.put("/san-pham/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    // Validation body
    const { data } = await instance.put(`/products/${id}`, body);
    if (!data) {
      return res.status(404).json({
        message: "Cập nhật sản phẩm không thành công!",
      });
    }
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.delete("/san-pham/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await instance.delete(`/products/${id}`);
    return res.status(200).json({
      message: "Xoá sản phẩm thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
