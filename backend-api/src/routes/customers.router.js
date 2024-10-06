const express = require('express');
const customersController = require('../controllers/customers.controller.js');
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
/**
 * @swagger
 * /api/customers/filter:
 *   get:
 *     summary: Retrieve a list of customers based on specified filters
 *     description: Retrieve a list of customers using filters such as id, email, name, phone, and address.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter customers by ID
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter customers by email
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter customers by name (partial match)
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter customers by phone
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Filter customers by address (partial match)
 *     responses:
 *       200:
 *         description: A list of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   address:
 *                     type: string
 *                     example: "123 Main St, City, Country"
 */
router.get('/filter', customersController.getCustomersByFilter);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "456 Elm St, City, Country"
 *               password:
 *                 type: string
 *                 example: "$2b$10$eW8Z.bPIg/jD5P.9mP.8UeZyYhYTTxFJ4U2zJdS2a5MZ2l3Y9R9z2"
 *     responses:
 *       201:
 *         description: Customer created successfully.
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
 *                   example: Customer created successfully.
 *                 customerId:
 *                   type: integer
 *                   example: 2
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


router.post('/', customersController.createCustomer);
/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Retrieve a specific customer
 *     description: Retrieve details of a specific customer by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Customer details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 address:
 *                   type: string
 *                   example: "123 Main St, City, Country"
 *       404:
 *         description: Customer not found.
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
 *                   example: Customer not found.
 */


router.get('/:id', customersController.getCustomer);
/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a specific customer
 *     description: Update the details of a specific customer by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 example: "john.doe.updated@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "789 Pine St, City, Country"
 *               password:
 *                 type: string
 *                 example: "$2b$10$eW8Z.bPIg/jD5P.9mP.8UeZyYhYTTxFJ4U2zJdS2a5MZ2l3Y9R9z2"
 *     responses:
 *       200:
 *         description: Customer updated successfully.
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
 *                   example: Customer updated successfully.
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
 *       404:
 *         description: Customer not found.
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
 *                   example: Customer not found.
 */

router.put('/:id', customersController.updateCustomer);
/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a specific customer
 *     description: Delete a specific customer by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Customer deleted successfully.
 *       404:
 *         description: Customer not found.
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
 *                   example: Customer not found.
 */


router.delete('/:id', customersController.deleteCustomer);

router.all("/", methodNotAllowed);
router.all("/:id", methodNotAllowed);

module.exports = router;
