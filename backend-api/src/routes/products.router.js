const express = require('express');
const productsController = require('../controllers/products.controller.js');
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

router.get('/', productsController.getProductsByFilter);
router.post('/', productsController.createProduct);
router.delete('/', productsController.deleteAllProduct);
router.get('/:id', productsController.getProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);

module.exports = router;
