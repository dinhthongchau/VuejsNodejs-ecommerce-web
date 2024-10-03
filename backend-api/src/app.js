const express = require("express");
const cors = require("cors");



const JSend = require('./jsend');
const productsRouter = require("./routes/products.router");
const customersRouter = require("./routes/customers.router");
const ordersRouter = require("./routes/orders.router");
const {
    resourceNotFound,
    handleError,
    methodNotAllowed,
    
} = require('./controllers/errors.controller') 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.json(JSend.success());
});

// Sử dụng các router
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/customers", customersRouter);
app.use("/api/v1/orders", ordersRouter);

//handle 404 response

app.use(resourceNotFound);

//define error handler middleware last, after other app.use() and routes calls

app.use(handleError);
module.exports = app;
