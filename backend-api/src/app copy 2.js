require("dotenv").config();

const express = require("express");
const cors = require("cors");
const JSend = require("./jsend");
const nodemailer = require("nodemailer");
const customerRouter = require("./routes/customer.router");
const productRouter = require("./routes/product.router");
const orderRouter = require("./routes/order.router");
const cartRouter = require("./routes/cart.router");

const {
  resourceNotFound,
  handleError,
  //methodNotAllowed,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");

const app = express();

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

//gui mail qua
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body; // Get email data from frontend request

  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_OF_API,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email: " + error.message });
  }
});
productRouter.setup(app);
customerRouter.setup(app);
orderRouter.setup(app);
cartRouter.setup(app);

//handle 404 response
app.use(resourceNotFound);

//define error handler middleware last, after other app.use() and routes calls
app.use(handleError);

module.exports = app;
