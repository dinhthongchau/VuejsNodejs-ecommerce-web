const express = require('express');
const orderItemsController = require('../controllers/orderItems.controller.js');
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
/**
 * @swagger
 * /api/order-items:
 *   get:
 *     summary: Get all order items
 *     description: Fetch all order items or based on filters.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Filter order items by ID.
 *         schema:
 *           type: integer
 *       - name: product_id
 *         in: query
 *         required: false
 *         description: Filter order items by product ID.
 *         schema:
 *           type: integer
 *       - name: order_id
 *         in: query
 *         required: false
 *         description: Filter order items by order ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched order items.
 *         examples:
 *           application/json:
 *             - id: 1
 *               product_id: 101
 *               order_id: 1001
 *               product_name: "Phone Case"
 *               quantity: 2
 *               price: 15.99
 *             - id: 2
 *               product_id: 102
 *               order_id: 1001
 *               product_name: "Screen Protector"
 *               quantity: 1
 *               price: 7.99
 */
router.get('/', orderItemsController.getOrderItemsByFilter);

/**
 * @swagger
 * /api/order-items:
 *   post:
 *     summary: Create new order items
 *     description: Add items to a specific order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *                 description: The ID of the order to which items will be added.
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       description: The ID of the product being ordered.
 *                     product_name:
 *                       type: string
 *                       description: The name of the product at the time of order.
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product ordered.
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: The price of the product at the time of order.
 *           example:
 *             order_id: 1001
 *             items:
 *               - product_id: 101
 *                 product_name: "Phone Case"
 *                 quantity: 2
 *                 price: 15.99
 *               - product_id: 102
 *                 product_name: "Screen Protector"
 *                 quantity: 1
 *                 price: 7.99
 *     responses:
 *       201:
 *         description: Order items created successfully.
 */
router.post('/', orderItemsController.createOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   get:
 *     summary: Get an order item by ID
 *     description: Fetch details of a specific order item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item details retrieved successfully.
 *         examples:
 *           application/json:
 *             id: 1
 *             product_id: 101
 *             order_id: 1001
 *             product_name: "Phone Case"
 *             quantity: 2
 *             price: 15.99
 */
router.get('/:id', orderItemsController.getOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   put:
 *     summary: Update an order item by ID
 *     description: Update the quantity, product ID, or price of a specific order item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The updated product ID.
 *               product_name:
 *                 type: string
 *                 description: The updated product name.
 *               quantity:
 *                 type: integer
 *                 description: The updated quantity.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The updated price.
 *           example:
 *             product_id: 101
 *             product_name: "Updated Phone Case"
 *             quantity: 3
 *             price: 17.99
 *     responses:
 *       200:
 *         description: Order item updated successfully.
 */
router.put('/:id', orderItemsController.updateOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   delete:
 *     summary: Delete an order item by ID
 *     description: Remove an item from a specific order.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item deleted successfully.
 *         examples:
 *           application/json:
 *             message: "Order item deleted successfully."
 */
router.delete('/:id', orderItemsController.deleteOrderItem);
router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);
module.exports = router;
