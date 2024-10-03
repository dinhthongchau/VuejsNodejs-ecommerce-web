const express = require('express');
const customersController = require('../controllers/customers.controller.js');
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

router.get('/', customersController.getCustomersByFilter);
router.post('/', customersController.createCustomer);
router.get('/:id', customersController.getCustomer);
router.put('/:id', customersController.updateCustomer);
router.delete('/:id', customersController.deleteCustomer);

router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);

module.exports = router;
