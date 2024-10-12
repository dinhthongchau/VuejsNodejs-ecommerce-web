const productsService = require('../services/product.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

// function createProduct(req, res) {
//     return res.status(201).json(JSend.success({ product: {} }));
// }
async function createProduct(req, res, next) {
  // Kiểm tra dữ liệu đầu vào
  if (!req.body?.product_name || typeof req.body.product_name !== 'string') {
      return next(new ApiError(400, 'Product name should be a non-empty string'));
  }

  const product_price = parseFloat(req.body.product_price);
  if (isNaN(product_price)) {
      return next(new ApiError(400, 'Product price should be a valid number'));
  }

  if (!req.body?.product_color || typeof req.body.product_color !== 'string' || req.body.product_color.trim() === '') {
      return next(new ApiError(400, 'Product color should be a non-empty string'));
  }

  if (!req.body?.product_description || typeof req.body.product_description !== 'string' || req.body.product_description.trim() === '') {
      return next(new ApiError(400, 'Product description should be a non-empty string'));
  }

  // Kiểm tra hình ảnh
  if (!req.file && !req.body.product_image) {
      return next(new ApiError(400, 'Product image is required'));
  }

  try {
      const product = await productsService.createProduct({
          product_name: req.body.product_name,
          product_price: product_price,
          product_color: req.body.product_color,
          product_description: req.body.product_description,
          product_image: req.file ? `/public/uploads/${req.file.filename}` : req.body.product_image,
      });

      return res
          .status(201)
          .set({
              Location: `${req.baseUrl}/${product.product_id}` // Thiết lập Location với product_id
          })
          .json(JSend.success({ product }));

  } catch (error) {
      console.error(error);
      return next(new ApiError(500, 'An error occurred while creating the product'));
  }
}
// async function createProduct(req, res, next) {
//   // Kiểm tra dữ liệu đầu vào
//   if (!req.body?.product_name || typeof req.body.product_name !== 'string') {
//       return next(new ApiError(400, 'Product name should be a non-empty string'));
//   }

//   const product_price = parseFloat(req.body.product_price);
//   if (!product_price || isNaN(product_price)) {
//       return next(new ApiError(400, 'Product price should be a valid number'));
//   }

//   if (!req.body?.product_color || typeof req.body.product_color !== 'string' || req.body.product_color.trim() === '') {
//       return next(new ApiError(400, 'Product color should be a non-empty string'));
//   }

//   if (!req.body?.product_description || typeof req.body.product_description !== 'string' || req.body.product_description.trim() === '') {
//       return next(new ApiError(400, 'Product description should be a non-empty string'));
//   }

//   // Kiểm tra hình ảnh
//   if (!req.file && !req.body.product_image) {
//       return next(new ApiError(400, 'Product image is required'));
//   }

//   try {
//       const product = await productsService.createProduct({
//           ...req.body,
//           product_image: req.file ? `/public/uploads/${req.file.filename}` : req.body.product_image,
//       });

//       return res
//           .status(201)
//           .set({
//               Location: `${req.baseUrl}/${product.product_id}` // Sử dụng product.product_id để thiết lập Location
//           })
//           .json(
//               JSend.success({
//                   product,
//               })
//           );

//   } catch (error) {
//       console.log(error);
//       return next(
//           new ApiError(500, 'An error occurred while creating the product')
//       );
//   }
// }


function getProductsByFilter(req, res) {
  const filters = [];
  const { product_name, product_price, product_color } = req.query;

  // Lọc theo tên sản phẩm nếu có
  if (product_name) {
      filters.push(`product_name=${product_name}`);
  }

  // Lọc theo giá sản phẩm nếu có
  if (product_price) {
      filters.push(`product_price=${product_price}`);
  }

  // Lọc theo màu sản phẩm nếu có
  if (product_color) {
      filters.push(`product_color=${product_color}`);
  }

  console.log(filters.join('&'));

  // Trả về dữ liệu mẫu
  return res.json({ products: [] });
}

  
  function getProduct(req, res) {
    return res.json(JSend.success({ product: {} }));
  }
  function updateProduct(req, res) {
    return res.json(JSend.success({ product: {} }));
  }
  function deleteProduct(req, res) {
   return res.json(JSend.success({ product: {} }));
  }

  function deleteAllProduct(req, res) {
    return res.json(JSend.success({ product: {} }));
  }

  
module.exports = {
    createProduct,
    getProductsByFilter,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteAllProduct,
  };
  