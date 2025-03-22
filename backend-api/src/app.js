require("dotenv").config();
const mailjet = require("node-mailjet");
const express = require("express");
const cors = require("cors");
const JSend = require("./jsend");
const crypto = require("crypto");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const knex = require("./database/knex"); // Dùng knex thay mysql
const customerRouter = require("./routes/customer.router");
const productRouter = require("./routes/product.router");
const orderRouter = require("./routes/order.router");
const cartRouter = require("./routes/cart.router");
const adminRouter = require("./routes/admin.router");
const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");

const app = express();
const secretKey = crypto.randomBytes(32).toString("hex");

// Gắn knex vào app
app.set("db", knex);

// Kiểm tra kết nối database và log kết quả
knex
  .raw("SELECT 1")
  .then(() => {
    console.log("Knex connected to DB");
  })
  .catch((err) => {
    console.error("Knex connection error:", err);
  });

// Sử dụng MemoryStore cho session (với cảnh báo trong log)
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000, // 24h
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 2 }, // 2 giờ
  })
);
console.log(
  "Using MemoryStore for session management (warning: not ideal for production)"
);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware để log request
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  return res.json(JSend.success({ message: "Hello from GAE!" }));
});

app.use("/public", express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const mjClient = new mailjet.Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;
  const request = mjClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: { Email: process.env.EMAIL_OF_API, Name: "ChauDinhThong API" },
        To: [{ Email: to, Name: "You" }],
        Subject: subject,
        TextPart: text,
        HTMLPart: html,
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

// Middleware để log lỗi chi tiết
app.use((err, req, res, next) => {
  console.error("Detailed error:", err);
  next(err);
});

productRouter.setup(app);
customerRouter.setup(app);
orderRouter.setup(app);
cartRouter.setup(app);
adminRouter.setup(app);

app.use(resourceNotFound);
app.use(handleError);

module.exports = app;
