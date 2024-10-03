const express = require('express');
const productsController = require('../controllers/products.controller.js');
const router = express.Router();

router.get('/', productsController.getProductsByFilter);
router.post('/', productsController.createProduct);
router.delete('/', productsController.deleteAllProduct);
router.get('/:id', productsController.getProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
