const express = require('express');
const ordersController = require('../controllers/orders.controller.js');
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

router.get('/', ordersController.getOrdersByFilter);
router.post('/', ordersController.createOrder);
router.get('/:id', ordersController.getOrder);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);

module.exports = router;
