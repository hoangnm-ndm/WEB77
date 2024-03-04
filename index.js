import express from "express";
import { datas } from "./data.js";
import { users, posts } from "./data_lesson_2.js";
import { v4 as uuidv4 } from "uuid";
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

app.get("/", async (req, res) => {
  const { data } = await instance.get("/products");
  console.log(data);
  res.send(data);
});
app.get("/san-pham", (req, res) => {
  console.log(req.query);
  const brand = req.query.brand;
  if (brand) {
    const filterData = datas.filter((item) => item.brand === brand);
    res.send(filterData);
  }
  res.send(datas);
});

app.get("/san-pham/:id", (req, res) => {
  // :id là 1 param trong object req.params
  const id = req.params.id;
  if (id) {
    const product = datas.find((item) => item.id === +id);
    if (!product) {
      res.status(404).send("Không tìm thấy sản phẩm");
      return;
    }
    res.send(product);
  }
});

// ! Path bao gồm 2 thành phần chính (1 là cố định, 2 là biến)
// ! Callback là hàm được truyền vào một hàm khác như một tham số

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Email hoặc password không được để trống");
    return;
  }
  if (users.find((item) => item.email === email)) {
    res.status(400).send("Email đã tồn tại");
    return;
  }
  const newUser = {
    id: uuidv4(),
    email,
    password,
  };
  users.push(newUser);
  console.log(users);
  res.send(`Đăng ký thành công, ${newUser.email}`);
});

app.post("/login", (req, res) => {
  res.send("Đăng nhập thành công");
});

app.put("/reset-password", (req, res) => {
  res.send("Reset password thành công");
});

app.delete("/delete-account", (req, res) => {
  res.status(200).send("Xóa tài khoản thành công");
});

// ! GET PATCH PUT POST DELETE

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
