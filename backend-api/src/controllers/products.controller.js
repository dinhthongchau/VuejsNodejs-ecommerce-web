const productsService = require('../services/products.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

// function createProduct(req, res) {
//     return res.status(201).json(JSend.success({ product: {} }));
// }
async function createProduct(req, res, next) {
  // Kiểm tra nếu thiếu tên hoặc tên không phải là chuỗi
  if (!req.body?.name || typeof req.body.name !== 'string') {
    return next(new ApiError(400, 'Name should be a non-empty string'));
  }

  try {
    // Tạo sản phẩm mới từ dữ liệu của form
    const product = await productService.createProduct({
      ...req.body,
      image: req.file ? `/public/uploads/${req.file.filename}` : null,  // Xử lý ảnh sản phẩm
    });

    // Trả về kết quả thành công kèm theo thông tin sản phẩm mới
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${product.id}`  // Đặt thông tin Location cho sản phẩm mới
      })
      .json(
        JSend.success({ 
          product,
        })
      );

  } catch (error) { 
    console.error(error);
    return next(
      new ApiError(500, 'An error occurred while creating the product')
    );
  }
}

  
async function getProductsByFilter(req, res) {
  const filters = [];
  const { id, name, brand, price, quantity, description, specs, images, status } = req.query;

  if (id) {
      filters.push(`id=${id}`);
  }
  if (name) {
      filters.push(`name LIKE '%${name}%'`); // Sử dụng LIKE cho tìm kiếm tên
  }
  if (brand) {
      filters.push(`brand='${brand}'`);
  }
  if (price) {
      const [min_price, max_price] = price.split(',').map(Number);
      if (min_price !== undefined && max_price !== undefined) {
          filters.push(`price >= ${min_price} AND price <= ${max_price}`);
      } else if (min_price !== undefined) {
          filters.push(`price >= ${min_price}`);
      } else if (max_price !== undefined) {
          filters.push(`price <= ${max_price}`);
      }
  }
  if (quantity) {
      filters.push(`quantity=${quantity}`);
  }
  if (description) {
      filters.push(`description LIKE '%${description}%'`); // Sử dụng LIKE cho tìm kiếm mô tả
  }
  if (specs) {
      filters.push(`specs LIKE '%${JSON.stringify(specs)}%'`); // Giả sử specs là một đối tượng JSON
  }
  if (images) {
      filters.push(`images LIKE '%${images}%'`); // Tìm kiếm theo URL hình ảnh
  }
  if (status) {
      filters.push(`status='${status}'`);
  }

  try {
      const products = await Product.findAll({
          where: filters.length ? { [Op.and]: filters } : {},
      });
      return res.json(JSend.success({ product: products }));
  } catch (error) {
      return res.status(500).json(JSend.error('Failed to fetch products', error));
  }
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
  