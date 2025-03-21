require("dotenv").config();
const mailjet = require("node-mailjet");
const express = require("express");
const cors = require("cors");
const JSend = require("./jsend");
const crypto = require("crypto");
const session = require("express-session");
const nodemailer = require("nodemailer");
const customerRouter = require("./routes/customer.router");
const productRouter = require("./routes/product.router");
const orderRouter = require("./routes/order.router");
const cartRouter = require("./routes/cart.router");
const adminRouter = require("./routes/admin.router");
const {
  resourceNotFound,
  handleError,
  //methodNotAllowed,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");

const app = express();
const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }, // Đặt true nếu bạn sử dụng HTTPS
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  return res.json(JSend.success());
});

// app.use('/public/images', express.static('public'));
app.use("/public", express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// app.use(upload.none());

// //gui mail qua
// app.post("/send-email", async (req, res) => {
//   const { to, subject, text, html } = req.body; // Get email data from frontend request

//   const transporter = nodemailer.createTransport({
//     host: "smtp.sendgrid.net",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "apikey",
//       pass: process.env.SENDGRID_API_KEY,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_OF_API,
//     to,
//     subject,
//     text,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email response:", info);
//     res.json({ message: "Email sent successfully!", info });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to send email: " + error.message });
//   }
// });
// Kết nối với Mailjet
const mjClient = new mailjet.Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

// Gửi email qua Mailjet
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body; // Lấy dữ liệu email từ request frontend

  const request = mjClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.EMAIL_OF_API, // Email người gửi từ .env
          Name: "ChauDinhThong API KEY mjClient", // Tên người gửi (có thể tùy chỉnh)
        },
        To: [
          {
            Email: to, // Địa chỉ email người nhận
            Name: "You", // Tên người nhận (có thể tùy chỉnh)
          },
        ],
        Subject: subject, // Tiêu đề email
        TextPart: text, // Nội dung dạng text
        HTMLPart: html, // Nội dung dạng HTML
      },
    ],
  });

  try {
    const result = await request;
    console.log("Email response:", result.body);
    res.json({ message: "Email sent successfully!", response: result.body });
  } catch (error) {
    console.error("Mailjet error:", error);
    res.status(500).json({ message: "Failed to send email: " + error.message });
  }
});
productRouter.setup(app);
customerRouter.setup(app);
orderRouter.setup(app);
cartRouter.setup(app);
adminRouter.setup(app);
//handle 404 response
app.use(resourceNotFound);

//define error handler middleware last, after other app.use() and routes calls
app.use(handleError);

module.exports = app;
