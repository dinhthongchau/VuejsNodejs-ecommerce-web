/* eslint-disable no-undef */
const express = require("express");
//const orderController = require("../controllers/order.controller.js");
const cartController = require("../controllers/cart.controller.js");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller.js");
const avatarUpload = require('../middlewares/avatar-upload.middleware.js');

module.exports.setup = (app) => {
  app.use('/api/v1/carts', router);

    /**
     * @swagger
     * /api/v1/carts/filter:
     *   get:
     *     summary: Get carts by filter
     *     description: Retrieve a list of carts based on filtering criteria
     *     parameters:
     *       - in: query
     *         name: cart_id
     *         schema:
     *           type: string
     *         description: Filter by cart id
     *       - in: query
     *         name: customer_id
     *         schema:
     *           type: string
     *         description: Filter by customer id
     *       - in: query
     *         name: product_id
     *         schema:
     *           type: string
     *         description: Filter by product id
     *       - in: query
     *         name: quantity
     *         schema:
     *           type: integer
     *         description: Filter by quantity
     *       - $ref: '#/components/parameters/limitParam'
     *       - $ref: '#/components/parameters/pageParam'
     *     tags:
     *       - carts
     *     responses:
     *       200:
     *         description: A list of carts
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
     *                     carts:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/Cart'
     *                     metadata:
     *                       $ref: '#/components/schemas/PaginationMetadata'
     */
    router.get('/filter/', cartController.getCartsByFilter);

    /**
     * @swagger
     * /api/v1/carts:
     *   post:
     *     summary: Create a new cart
     *     description: Create a new cart for a customer, with optional file upload (e.g. a receipt or related document).
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/Cart' 
     *     tags:
     *       - carts
     *     responses:
     *       201:
     *         description: A new cart created
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
     *                     cart:
     *                       $ref: '#/components/schemas/Cart'
     *       400:
     *         description: Invalid input or validation error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: The response status
     *                   enum: [fail]
     *                 message:
     *                   type: string
     *                   description: A message describing the error
     *                 details:
     *                   type: object
     *                   description: Additional error details (if available)
     */
    router.post('/', avatarUpload, cartController.createCart); // Create a new cart

    /**
     * @swagger
     * /api/v1/carts:
     *   delete:
     *     summary: Delete all carts
     *     description: Delete all carts
     *     tags:
     *       - carts
     *     responses:
     *       200:
     *         description: All carts deleted
     *         $ref: '#/components/responses/200NoData'
     */
    router.delete('/', cartController.deleteAllCarts); // Delete all carts

    router.all('/', methodNotAllowed); // Handle disallowed methods

    /**
     * @swagger
     * /api/v1/carts/{cart_id}:
     *   get:
     *     summary: Get cart by ID
     *     description: Get cart by ID
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     tags:
     *       - carts
     *     responses:
     *       200:
     *         description: A cart
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
     *                     cart:
     *                       $ref: '#/components/schemas/Cart'
     */
    router.get('/:cart_id', cartController.getCart); // Get cart by ID

    /**
     * @swagger
     * /api/v1/carts/{cart_id}:
     *   put:
     *     summary: Update cart by ID
     *     description: Update cart by ID
     *     parameters:
     *       - in: path
     *         name: cart_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the cart to update
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/Cart'
     *     tags:
     *       - carts
     *     responses:
     *       200:
     *         description: An updated cart
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
     *                     cart:
     *                       $ref: '#/components/schemas/Cart'
     */
    router.put('/:cart_id', avatarUpload, cartController.updateCart); // Update cart by ID

    /**
     * @swagger
     * /api/v1/carts/{cart_id}:
     *   delete:
     *     summary: Delete cart by ID
     *     description: Delete a cart by its ID.
     *     parameters:
     *       - in: path
     *         name: cart_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the cart to delete
     *     tags:
     *       - carts
     *     responses:
     *       200:
     *         description: Cart deleted
     *         $ref: '#/components/responses/200NoData'
     */
    router.delete('/:cart_id', cartController.deleteCart); // Delete cart by ID


    router.all('/:order_id', methodNotAllowed); // Xử lý phương thức không được phép


}