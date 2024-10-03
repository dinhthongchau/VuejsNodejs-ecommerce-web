const express = require('express');
const customersController = require('../controllers/customers.controller.js');
const router = express.Router();

router.get('/', customersController.getCustomersByFilter);
router.post('/', customersController.createCustomer);
router.get('/:id', customersController.getCustomer);
router.put('/:id', customersController.updateCustomer);
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;
