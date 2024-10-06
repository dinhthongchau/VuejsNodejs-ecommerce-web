const express = require('express');
const ordersController = require('../controllers/orders.controller.js');
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Fetch all orders or based on filters.
 *     parameters:
 *       - name: customer_id
 *         in: query
 *         required: false
 *         description: Filter orders by customer ID.
 *         schema:
 *           type: integer
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter orders by status.
 *         schema:
 *           type: string
 *       - name: order_date
 *         in: query
 *         required: false
 *         description: Filter orders by order date.
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: total_amount
 *         in: query
 *         required: false
 *         description: Filter orders by total amount.
 *         schema:
 *           type: number
 *       - name: payment_method
 *         in: query
 *         required: false
 *         description: Filter orders by payment method.
 *         schema:
 *           type: string
 *       - name: notes
 *         in: query
 *         required: false
 *         description: Filter orders by notes.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched orders.
 *         examples:
 *           application/json:
 *             [
 *               {
 *                 "id": 1,
 *                 "customer_id": 101,
 *                 "order_date": "2024-10-06T10:00:00Z",
 *                 "total_amount": 150.75,
 *                 "status": "completed",
 *                 "payment_method": "credit_card",
 *                 "notes": "Delivered on time"
 *               },
 *               {
 *                 "id": 2,
 *                 "customer_id": 102,
 *                 "order_date": "2024-10-06T12:00:00Z",
 *                 "total_amount": 75.50,
 *                 "status": "pending",
 *                 "payment_method": "paypal",
 *                 "notes": "Awaiting payment confirmation"
 *               }
 *             ]
 */
router.get('/', ordersController.getOrdersByFilter);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Add a new order to the system.
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
 *               status:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         examples:
 *           application/json:
 *             {
 *               "id": 3,
 *               "customer_id": 103,
 *               "order_date": "2024-10-06T14:00:00Z",
 *               "total_amount": 200.00,
 *               "status": "pending",
 *               "payment_method": "bank_transfer",
 *               "notes": "Urgent delivery"
 *             }
 */
router.post('/', ordersController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Fetch details of a specific order by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *         examples:
 *           application/json:
 *             {
 *               "id": 1,
 *               "customer_id": 101,
 *               "order_date": "2024-10-06T10:00:00Z",
 *               "total_amount": 150.75,
 *               "status": "completed",
 *               "payment_method": "credit_card",
 *               "notes": "Delivered on time"
 *             }
 */
router.get('/:id', ordersController.getOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     description: Update details of a specific order.
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
 *               customer_id:
 *                 type: integer
 *               order_date:
 *                 type: string
 *                 format: date-time
 *               total_amount:
 *                 type: number
 *               status:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully.
 *         examples:
 *           application/json:
 *             {
 *               "id": 1,
 *               "customer_id": 101,
 *               "order_date": "2024-10-06T10:00:00Z",
 *               "total_amount": 155.00,
 *               "status": "completed",
 *               "payment_method": "credit_card",
 *               "notes": "Delivered on time"
 *             }
 */
router.put('/:id', ordersController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     description: Remove an order from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *         examples:
 *           application/json:
 *             {
 *               "message": "Order deleted successfully."
 *             }
 */
router.delete('/:id', ordersController.deleteOrder);
router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);
module.exports = router;
