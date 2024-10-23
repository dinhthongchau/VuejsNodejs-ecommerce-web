/* eslint-disable no-undef */

const multer = require('multer');
const path = require('path');
const ApiError = require('../api-error');
// implement to use  router put 
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product.controller'); // Update the path as necessary


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniquePrefix + path.extname(file.originalname));
    },
});

function avatarUpload(req, res, next) {
  const upload = multer({ storage: storage }).array("product_imageFiles", 10); // Cho phép upload tối đa 10 file (tuỳ chỉnh số lượng)

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(
        new ApiError(400, "An error occured while uploading the avatar")
      );
    } else if (err) {
      return next(
        new ApiError(500, "An unknow error occured while uploading the avatar")
      );
    }

    next();
  });
}
// Define the update product route with avatarUpload middleware
router.put('/products/:id', avatarUpload, productsController.updateProduct);
module.exports = avatarUpload;
