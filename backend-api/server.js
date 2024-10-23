require("dotenv").config();
const app = require("./src/app");
// Start the server
const port = process.env.PORT || 3300;

// // Định nghĩa các phương thức hợp lệ cho đường dẫn /api/products
// app.get("/api/products", (req, res) => {
//   res.status(200).json({ status: "success", data: { products: [] } });
// });
app.get("/api/v1/products", (req, res) => {
  // Logic để lấy sản phẩm từ cơ sở dữ liệu
  res.json({ status: "success", data: products });
});
app.listen(port, () => {
  console.log(`Server (1210) is running on port ${port}.`);
});
