const productsService = require('../services/product.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

function createProduct(req, res) {
    return res.status(201).json(JSend.success({ product: {} }));
}

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
  