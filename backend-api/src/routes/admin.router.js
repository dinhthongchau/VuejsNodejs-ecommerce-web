const express = require("express");
const adminController = require("../controllers/admin.controller.js");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller.js");
const avatarUpload = require("../middlewares/avatar-upload.middleware.js");


module.exports.setup = (app) => {
  app.use("/api/v1/admins", router);
  /**
   * @swagger
   * /api/v1/admins/create/:
   *   post:
   *     summary: Create a new admin
   *     description: Create a new admin
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Admin'
   *     tags:
   *       - admins
   *     responses:
   *       201:
   *         description: A new admin created
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
   *                     admin:
   *                       $ref: '#/components/schemas/Admin'
   */
  router.post("/create/", avatarUpload, adminController.createAdmin);

  /**
   * @swagger
   * /api/v1/admins/login/:
   *   post:
   *     summary: Login as a admin
   *     description: Authenticate a admin using username and password
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               admin_username:
   *                 type: string
   *                 description: Admin's username
   *               admin_password:
   *                 type: string
   *                 description: Admin's password
   *                 format: password
   *     tags:
   *       - admins
   *     responses:
   *       200:
   *         description: Successfully authenticated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *       401:
   *         description: Authentication failed
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Error message
   */
  router.post("/login/", avatarUpload, adminController.loginAdmin); // Xác thực đăng nhập

  /**
   * @swagger
   * /api/v1/admins/logout:
   *   post:
   *     summary: Logout a admin
   *     description: Logout from web
   *     tags:
   *       - admins
   *     responses:
   *       200:
   *         description: Successfully authenticated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *       401:
   *         description: Authentication failed
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [error]
   *                 message:
   *                   type: string
   *                   description: Error message
   */
  router.post("/logout/", adminController.logoutAdmin); // Xác thực đăng nhập

  //router.all("/:admin_id", methodNotAllowed); // Xử lý phương thức không được phép
  router.all("/", methodNotAllowed); // Xử lý phương thức không được phép
}