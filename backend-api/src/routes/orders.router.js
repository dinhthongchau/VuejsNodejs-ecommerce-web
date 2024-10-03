const express = require('express');
const ordersController = require('../controllers/orders.controller.js');
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders by filters
 *     description: Retrieve orders based on optional filters.
 *     parameters:
 *       - name: filter
 *         in: query
 *         required: false
 *         description: Optional filters for the orders.
 *         schema:
 *           type: object
 *           additionalProperties: true
 *     responses:
 *       200:
 *         description: A list of orders that match the filters.
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
 *                       customer_id:
 *                         type: integer
 *                       order_date:
 *                         type: string
 *                         format: date-time
 *                       total_amount:
 *                         type: number
 *                         format: float
 *                       status:
 *                         type: string
 *                       payment_method:
 *                         type: string
 *                       notes:
 *                         type: string
 *                         nullable: true
 *                       order_items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product_id:
 *                               type: integer
 *                             product_name:
 *                               type: string
 *                             quantity:
 *                               type: integer
 *                             price:
 *                               type: number
 *                               format: float
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
 *   post:
 *     summary: Create a new order
 *     description: Adds a new order to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               order_date:
 *                 type: string
 *                 format: date-time
 *               total_amount:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               notes:
 *                 type: string
 *                 nullable: true
 *               order_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     product_name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                       format: float
 *     responses:
 *       201:
 *         description: Successfully created a new order.
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
 *                     customer_id:
 *                       type: integer
 *                     order_date:
 *                       type: string
 *                       format: date-time
 *                     total_amount:
 *                       type: number
 *                       format: float
 *                     status:
 *                       type: string
 *       400:
 *         description: Bad Request if the order data is incorrect.
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
 *                   example: Invalid order data
 */
router.get('/', ordersController.getOrdersByFilter);
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "customer123"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "product123"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully.
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
 *                   example: Order created successfully.
 *                 orderId:
 *                   type: string
 *                   example: "order123"
 *       400:
 *         description: Bad request. Invalid input data.
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
 *                   example: Invalid input data.
 */

router.post('/', ordersController.createOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     description: Retrieve an order by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An order object.
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
 *                     customerName:
 *                       type: string
 *                     totalAmount:
 *                       type: number
 *                       format: float
 *                     status:
 *                       type: string
 *       404:
 *         description: Order not found.
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
 *                   example: Order not found
 *   put:
 *     summary: Update a specific order by ID
 *     description: Updates the details of an order.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the order.
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
 *                     customerName:
 *                       type: string
 *                     totalAmount:
 *                       type: number
 *                       format: float
 *                     status:
 *                       type: string
 *       400:
 *         description: Bad Request if the order data is incorrect.
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
 *                   example: Invalid order data
 *       404:
 *         description: Order not found.
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
 *                   example: Order not found
 *   delete:
 *     summary: Delete a specific order by ID
 *     description: Removes an order from the system.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the order.
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
 *                   example: Order deleted
 *       404:
 *         description: Order not found.
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
 *                   example: Order not found
 */
router.get('/:id', ordersController.getOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order
 *     description: Update the details of a specific order by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "product123"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Order updated successfully.
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
 *                   example: Order updated successfully.
 *       404:
 *         description: Order not found.
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
 *                   example: Order not found.
 */
router.put('/:id', ordersController.updateOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Delete a specific order by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully.
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
 *                   example: Order deleted successfully.
 *       404:
 *         description: Order not found.
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
 *                   example: Order not found.
 */
router.delete('/:id', ordersController.deleteOrder);

router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);

module.exports = router;
