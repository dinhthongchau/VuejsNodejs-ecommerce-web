/* eslint-disable no-undef */
const express = require("express");
//const orderController = require("../controllers/order.controller.js");
const orderController = require("../controllers/order.controller.js");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller.js");
const avatarUpload = require('../middlewares/avatar-upload.middleware.js');

module.exports.setup = (app) => {
  app.use('/api/v1/orders', router);

    /**
     * @swagger
     * /api/v1/orders/filter:
     *   get:
     *     summary: Get orders by filter
     *     description: Retrieve a list of orders based on filtering criteria
     *     parameters:
     *       - in: query
     *         name: order_id
     *         schema:
     *           type: string
     *         description: Filter by order id
     *       - in: query
     *         name: order_date
     *         schema:
     *           type: date-time
     *         description: Filter by order date
     *       - in: query
     *         name: order_payment_method
     *         schema:
     *           type: string
     *         description: Filter by order payment method
     *       - $ref: '#/components/parameters/limitParam'
     *       - $ref: '#/components/parameters/pageParam'
     *     tags:
     *       - orders
     *     responses:
     *       200:
     *         description: A list of orders
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
     *                     orders:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/Order'
     *                     metadata:
     *                       $ref: '#/components/schemas/PaginationMetadata'
     */
    router.get('/filter/', orderController.getOrdersByFilter);


    /**
     * @swagger
     * /api/v1/orders:
     *   post:
     *     summary: Create a new order
     *     description: Create a new order for a customer, with optional file upload (e.g. a receipt or related document).
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/Order' 
     *     tags:
     *       - orders
     *     responses:
     *       201:
     *         description: A new order created
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
     *                     order:
     *                       $ref: '#/components/schemas/Order'
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
    router.post('/', avatarUpload, orderController.createOrder); // Tạo sản phẩm mới

    /**
     * @swagger
     * /api/v1/orders:
     *   delete:
     *     summary: Delete all orders
     *     description: Delete all orders
     *     tags:
     *       - orders
     *     responses:
     *       200:
     *         description: All orders deleted
     *         $ref: '#/components/responses/200NoData'
     */
    router.delete('/', orderController.deleteAllOrder); // Xóa tất cả sản phẩm
    
    router.all('/', methodNotAllowed); // Xử lý phương thức không được phép
    
    /**
     * @swagger
     * /api/v1/orders/{order_id}:
     *   get:
     *     summary: Get order by ID
     *     description: Get order by ID
     *     parameters:
     *       - $ref: '#/components/parameters/orderIdParam'
     *     tags:
     *       - orders
     *     responses:
     *       200:
     *         description: A order
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
     *                     order:
     *                       $ref: '#/components/schemas/Order'
     */
    router.get('/:order_id', orderController.getOrder); // Lấy sản phẩm theo ID

    /**
 * @swagger
 * /api/v1/orders/{order_id}:
 *   put:
 *     summary: Update order by ID
 *     description: Update order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     tags:
 *       - orders
 *     responses:
 *       200:
 *         description: An updated order
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
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 */
    router.put('/:order_id', avatarUpload, orderController.updateOrder); // Cập nhật sản phẩm theo ID

    /**
     * @swagger
     * /api/v1/orders/{order_id}:
     *   delete:
     *     summary: Delete order by ID
     *     description: Delete a order by its ID.
     *     parameters:
     *       - in: path
     *         name: order_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the order to delete
     *     tags:
     *       - orders
     *     responses:
     *       200:
     *         description: Order deleted
     *         $ref: '#/components/responses/200NoData'
     */
    router.delete('/:order_id', orderController.deleteOrder); // Xóa sản phẩm theo ID
    
    router.all('/:order_id', methodNotAllowed); // Xử lý phương thức không được phép


}