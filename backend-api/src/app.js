const express = require("express");
const cors = require("cors");
const JSend = require("./jsend");

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

productRouter.setup(app);
customerRouter.setup(app);
orderRouter.setup(app);
cartRouter.setup(app);

//handle 404 response
app.use(resourceNotFound);

//define error handler middleware last, after other app.use() and routes calls
app.use(handleError);

module.exports = app;
