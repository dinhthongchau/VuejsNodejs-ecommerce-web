const express = require("express");
const productsController = require("../src/controllers/products.controller.js");
const router = express.Router();
const { methodNotAllowed } = require("../src/controllers/errors.controller.js");
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products by filters
 *     description: Retrieve products based on optional filters such as id, name, brand, category, status, and price range.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: ID of the product to filter.
 *         schema:
 *           type: integer
 *       - name: name
 *         in: query
 *         required: false
 *         description: Name of the product to filter.
 *         schema:
 *           type: string
 *       - name: brand
 *         in: query
 *         required: false
 *         description: Brand of the product to filter.
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         required: false
 *         description: Category of the product to filter (e.g., smartphone, accessories).
 *         schema:
 *           type: string
 *       - name: status
 *         in: query
 *         required: false
 *         description: Status of the product to filter (e.g., active, discontinued).
 *         schema:
 *           type: string
 *       - name: min_price
 *         in: query
 *         required: false
 *         description: Minimum price of the product.
 *         schema:
 *           type: number
 *           format: float
 *       - name: max_price
 *         in: query
 *         required: false
 *         description: Maximum price of the product.
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       200:
 *         description: A list of products that match the filters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       brand:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       quantity:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       specs:
 *                         type: object
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                   example: []
 *       400:
 *         description: Bad Request if filters are incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid filters
 */
router.get("/", productsController.getProductsByFilter);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the inventory.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               brand:
 *                 type: string
 *                 description: The brand of the product.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *               quantity:
 *                 type: integer
 *                 description: The available stock of the product.
 *               description:
 *                 type: string
 *                 description: A description of the product.
 *               specs:
 *                 type: object
 *                 description: Technical specifications of the product.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image URLs for the product.
 *               status:
 *                 type: string
 *                 description: The status of the product (e.g., active, discontinued).
 *     responses:
 *       201:
 *         description: Successfully created a new product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     brand:
 *                       type: string
 *                     price:
 *                       type: number
 *                       format: float
 *                     quantity:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     specs:
 *                       type: object
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     status:
 *                       type: string
 *       400:
 *         description: Bad Request if the product data is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid product data
 **/
router.post("/", productsController.createProduct);
/**
 * @swagger
 * /api/products:
 *   delete:
 *     summary: Delete all products
 *     description: Removes all products from the inventory.
 *     responses:
 *       200:
 *         description: Successfully deleted all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: All products deleted

**/
router.delete("/", productsController.deleteAllProduct);
router.all("/", methodNotAllowed);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     description: Retrieve a product by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     brand:
 *                       type: string
 *                     price:
 *                       type: number
 *                       format: float
 *                     quantity:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     specs:
 *                       type: object
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     status:
 *                       type: string
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Product not found
 **/
router.get("/:id", productsController.getProduct);
/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *     summary: Update a specific product by ID
 *     description: Updates the details of a product.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               brand:
 *                 type: string
 *                 description: The brand of the product.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *               quantity:
 *                 type: integer
 *                 description: The available stock of the product.
 *               description:
 *                 type: string
 *                 description: A description of the product.
 *               specs:
 *                 type: object
 *                 description: Technical specifications of the product.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image URLs for the product.
 *               status:
 *                 type: string
 *                 description: The status of the product (e.g., active, discontinued).
 *     responses:
 *       200:
 *         description: Successfully updated the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     brand:
 *                       type: string
 *                     price:
 *                       type: number
 *                       format: float
 *                     quantity:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     specs:
 *                       type: object
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     status:
 *                       type: string
 *       400:
 *         description: Bad Request if the product data is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid product data
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Product not found
 **/
router.put("/:id", productsController.updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *     summary: Delete a specific product by ID
 *     description: Removes a product from the inventory.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product deleted
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Product not found
 **/
router.delete("/:id", productsController.deleteProduct);
router.all("/:id", methodNotAllowed);

module.exports = router;
