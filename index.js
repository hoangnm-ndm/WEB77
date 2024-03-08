import express from "express";
import { datas } from "./data.js";
const app = express();
const PORT = 8000;

app.use(express.json()); // Middleware

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("Không có dữ liệu");
    }
    res.send(data);
  } catch (error) {
    res.end({
      name: error?.name,
      message: error?.message,
    });
  }
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
  const user = req.body;
  if (user.password.length < 6) {
    res.status(400).send("Mật khẩu phải có ít nhất 6 ký tự");
    return;
  }
  if (user.usename === "hoangnm") {
    res.status(400).send("Tên đăng nhập đã tồn tại");
    return;
  }
  //! Sau khi validation data, tạo user mới và lưu vào database
  res.send("Đăng ký thành công");
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
  console.log(`Server is running http://localhost:${PORT}`);
});
