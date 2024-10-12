const productsService = require('../services/product.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');



async function createProduct(req, res, next) {
  // Kiểm tra dữ liệu đầu vào
  if (!req.body?.product_name || typeof req.body.product_name !== 'string') {
    return next(new ApiError(400, 'Product name should be a non-empty string'));
  }

  try {
    // Tạo sản phẩm với dữ liệu từ body và xử lý ảnh nếu có
    const product = await productsService.createProduct({
      ...req.body,
      product_image: req.file ? `/public/uploads/${req.file.filename}` : null,
    });

    // Trả về phản hồi thành công với twhông tin sản phẩm và thiết lập header Location
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${product.product_id}`
      })
      .json(
        JSend.success({
          product,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, 'An error occurred while creating the product')
    );
  }
}



// function getProductsByFilter(req, res) {
//   const filters = [];
//   const { product_name, product_price, product_color } = req.query;

//   // Lọc theo tên sản phẩm nếu có
//   if (product_name) {
//       filters.push(`product_name=${product_name}`);
//   }

//   // Lọc theo giá sản phẩm nếu có
//   if (product_price) {
//       filters.push(`product_price=${product_price}`);
//   }

//   // Lọc theo màu sản phẩm nếu có
//   if (product_color) {
//       filters.push(`product_color=${product_color}`);
//   }

//   console.log(filters.join('&'));

//   // Trả về dữ liệu mẫu
//   return res.json({ products: [] });
// }
async function getProductsByFilter(req, res, next) {
  let result = {
    metadata: {
    products: [],
    totalRecords: 0,
    firstPage: 1,
    lastPage: 1,
    page: 1,
    limit: 5,
    }
  };
  try {
    result = await productsService.getManyProducts(req.query);
    
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'An error occurred while retrieving products'));
  }

   return res.json(
    JSend.success({
      products: result.products,
      metadata: result.metadata,
    })
  );
}
  
async function getProduct(req, res, next) {
  const { product_id } = req.params;

  try {
    const product = await productsService.getProductById(product_id); // Gọi dịch vụ để lấy sản phẩm theo ID
    if (!product) {
      return next(new ApiError(404, "Product not found")); // Nếu không tìm thấy sản phẩm
    }
    return res.json(JSend.success({ product })); // Trả về sản phẩm
  } catch (error) {
    console.error(error); // Ghi lại lỗi
    return next(new ApiError(500, `Error retrieving product with product_id=${product_id}`)); // Trả về lỗi 500
  }
}

  // function updateProduct(req, res) {
  //   return res.json(JSend.success({ product: {} }));
  // }
  
  async function updateProduct(req, res, next) {
    // Kiểm tra xem dữ liệu trong body có rỗng và không có file nào được tải lên
    if (Object.keys(req.body).length === 0 && !req.file) {
      return next(new ApiError(400, 'Data to update cannot be empty'));
    }
  
    const { product_id } = req.params; // Lấy ID sản phẩm từ params
  
    try {
      const updatedProduct = await productsService.updateProduct(product_id, {
        ...req.body, // Thêm dữ liệu từ body
        product_image: req.file ? `/public/uploads/${req.file.filename}` : null // Kiểm tra xem có file hình ảnh không
      });
  
      if (!updatedProduct) {
        return next(new ApiError(404, 'Product not found')); // Nếu không tìm thấy sản phẩm
      }
  
      return res.json(JSend.success({
        product: updatedProduct, // Trả về sản phẩm đã cập nhật
      }));
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, `Error updating product with product_id=${product_id}`)); // Lỗi trong quá trình cập nhật
    }
  }
  

  async function deleteProduct(req, res, next) {
    const { product_id } = req.params; // Lấy ID sản phẩm từ tham số đường dẫn
  
    try {
      const deleted = await productsService.deleteProduct(product_id); // Gọi dịch vụ để xóa sản phẩm
  
      if (!deleted) {
        return next(new ApiError(404, 'Product not found')); // Nếu không tìm thấy sản phẩm
      }
  
      return res.json(JSend.success()); // Trả về phản hồi thành công
    } catch (error) {
      console.log(error); // Ghi log lỗi
      return next(new ApiError(500, `Could not delete product with product_id=${product_id}`)); // Xử lý lỗi
    }
  }
  

 
  async function deleteAllProduct(req, res, next) {
    try {
      await productsService.deleteAllProduct();
      return res.json(JSend.success());
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, 'An error occurred while removing all products'));
    }
  }
  
module.exports = {
    createProduct,
    getProductsByFilter,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteAllProduct,
  };
  