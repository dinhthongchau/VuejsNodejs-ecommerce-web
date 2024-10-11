/* eslint-disable no-undef */
const express = require("express");
const productsController = require("../controllers/product.controller.js");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller.js");

module.exports.setup = (app) => {
  app.use("/api/v1/products", router);

  /**
   * @swagger
   * /api/v1/products:
   *   get:
   *     summary: Get products by filter
   *     description: Retrieve a list of products based on filtering criteria
   *     parameters:
   *       - in: query
   *         name: product_name
   *         schema:
   *           type: string
   *         description: Filter by product name
   *       - in: query
   *         name: product_price
   *         schema:
   *           type: string
   *         description: Filter by product price
   *       - in: query
   *         name: product_color
   *         schema:
   *           type: string
   *         description: Filter by product color
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: A list of products
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     products:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Product'
   *                     metadata:
   *                       $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get('/', productsController.getProductsByFilter); // Lọc sản phẩm

  /**
   * @swagger
   * /api/v1/products:
   *   post:
   *     summary: Create a new product
   *     description: Create a new product
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     tags:
   *       - products
   *     responses:
   *       201:
   *         description: A new product created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     product:
   *                       $ref: '#/components/schemas/Product'
   */
  router.post('/', productsController.createProduct); // Tạo sản phẩm mới

  /**
   * @swagger
   * /api/v1/products:
   *   delete:
   *     summary: Delete all products
   *     description: Delete all products
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: All products deleted
   *         $ref: '#/components/responses/200NoData'
   */
  router.delete('/', productsController.deleteAllProduct); // Xóa tất cả sản phẩm
  router.all('/', methodNotAllowed); // Xử lý phương thức không được phép

  /**
   * @swagger
   * /api/v1/products/{id}:
   *   get:
   *     summary: Get product by ID
   *     description: Get product by ID
   *     parameters:
   *       - $ref: '#/components/parameters/productIdParam'
   *     tags:
   *       - products
   *     responses:
   *       200:
   *         description: A product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     product:
   *                       $ref: '#/components/schemas/Product'
   */
  router.get('/:id', productsController.getProduct); // Lấy sản phẩm theo ID

  /**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update product by ID
 *     description: Update product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     tags:
 *       - products
 *     responses:
 *       200:
 *         description: An updated product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The response status
 *                   enum: [success]
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 */
router.put('/:id', productsController.updateProduct); // Cập nhật sản phẩm theo ID

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Delete a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     tags:
 *       - products
 *     responses:
 *       200:
 *         description: Product deleted
 *         $ref: '#/components/responses/200NoData'
 */
router.delete('/:id', productsController.deleteProduct); // Xóa sản phẩm theo ID
router.all('/:id', methodNotAllowed); // Xử lý phương thức không được phép
};