const express = require("express");
const productsController = require("../controllers/product.controller.js");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller.js");
const avatarUpload=require("../middlewares/avatar-upload.middleware")

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products based on filters
 *     description: Fetch products based on optional filters.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Filter by product ID.
 *         schema:
 *           type: integer
 *       - name: name
 *         in: query
 *         required: false
 *         description: Filter by product name.
 *         schema:
 *           type: string
 *       - name: brand
 *         in: query
 *         required: false
 *         description: Filter by product brand.
 *         schema:
 *           type: string
 *       - name: price
 *         in: query
 *         required: false
 *         description: Filter products based on price range.
 *         schema:
 *           type: string
 *           example: "min_price=100&max_price=500"
 *       - name: quantity
 *         in: query
 *         required: false
 *         description: Filter by available stock quantity.
 *         schema:
 *           type: integer
 *       - name: description
 *         in: query
 *         required: false
 *         description: Filter by product description.
 *         schema:
 *           type: string
 *       - name: specs
 *         in: query
 *         required: false
 *         description: Filter by technical specifications.
 *         schema:
 *           type: object
 *       - name: images
 *         in: query
 *         required: false
 *         description: Filter by product images (URLs).
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter by product status.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
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
 *                 description: The status of the product.
 *     responses:
 *       201:
 *         description: Product created successfully.
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
 */
// router.post("/", productsController.createProduct);
router.post("/", avatarUpload, productsController.createProduct);
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
 */
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
 */
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
 *                 description: The status of the product.
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
 */
router.put("/:id", productsController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
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
 */
router.delete("/:id", productsController.deleteProduct);
router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);
module.exports = router;
