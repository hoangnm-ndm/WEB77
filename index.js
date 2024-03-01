import http from "http";

const PORT = 8000;
const myStudents = ["Thanh", "Chau", "Thao"];
const app = http.createServer((request, response) => {
  /**
   * Tuyến đường chính http://localhost:8000/ -> /
   * Tuyến đường nhỏ đi ra từ tuyến chính -> /danh-cho-nam
   */

  const products = [
    { id: 1, name: "iphone 15", price: 2000 },
    { id: 2, name: "iphone X", price: 2000 },
    { id: 3, name: "iphone 9", price: 2000 },
  ];
  const endpoint = request.url;
  switch (endpoint) {
    // với base endpoint (base API), mặc định base endpoint sẽ là /
    case "/":
      response.end(`<h1>Home page<h1>`);
      break;
    // với endpoint /students
    case "/san-pham":
      response.end(`<h1>Shop</h1>`);
      break;

    case "/products":
      response.end(JSON.stringify(products));
      break;
    default:
      response.end(`Error, Notfound API!`);
      break;
  }
});

// CRUD = Create - Read - Update - Delete
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
