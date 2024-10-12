const knex = require('../database/knex');
const Paginator = require('./paginator');
function productRepository() {
    return knex('Product');
}

function readProduct(payload) {
    return {
        product_id: payload.product_id,
        product_name: payload.product_name,
        product_price: payload.product_price,
        product_color: payload.product_color,
        product_description: payload.product_description,
        product_image: payload.product_image,
    };
}
async function createProduct(payload) {
  const product = readProduct(payload); // Gọi hàm readProduct để lấy dữ liệu sản phẩm
  const [product_id] = await productRepository().insert(product); // Chèn sản phẩm vào cơ sở dữ liệu và lấy ID
  return { product_id, ...product }; // Trả về ID cùng với thông tin sản phẩm
}

async function getManyProducts(query) {
  try {
    const { product_name, product_price, product_color, page = 1, limit = 5 } = query;
    const paginator = new Paginator(page, limit);

    let results = await productRepository()
      .where((builder) => {
        if (product_name) {
          builder.where('product_name', 'like', `%${product_name}%`);
        }
        if (product_price) {
          builder.where('product_price', '=', product_price);
        }
        if (product_color) {
          builder.where('product_color', 'like', `%${product_color}%`);
        }
      })
      .select(
        knex.raw('count(product_id) OVER() AS recordCount'),
        'product_id',
        'product_name',
        'product_price',
        'product_color',
        'product_description'
      )
      .limit(paginator.limit)
      .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordCount;
      delete result.recordCount;
      return result;
    });

    return {
      metadata: paginator.getMetadata(totalRecords),
      products: results,
    };
  } catch (error) {
    console.error('Error in getManyProducts:', error); // Ghi log lỗi
    throw new ApiError(500, 'An error occurred while retrieving products');
  }
}



async function getProductById(product_id) {

  return productRepository().where('product_id', product_id).select('*').first();
}
// // Define functions for accessing the database
// async function createProduct(payload) {
//     const productData = readProduct(payload);
//     const [newProduct] = await productRepository().insert(productData).returning('*');
//     return newProduct;
// }

// async function getAllProducts() {
//     return await productRepository().select('*');
// }

// async function getProductById(productId) {
//     return await productRepository().where('product_id', productId).first();
// }
async function updateProduct(product_id, payload) {
  // Lấy sản phẩm hiện tại theo ID
  const updatedProduct = await productRepository()
    .where("product_id", product_id)
    .select("*")
    .first();

  if (!updatedProduct) {
    return null; // Nếu không tìm thấy sản phẩm
  }

  const update = readProduct(payload); // Đọc và chuẩn hóa dữ liệu

  // Xóa thuộc tính image nếu không có trong payload
  if (!update.product_image) {
    delete update.product_image;
  }

  // Cập nhật sản phẩm
  await productRepository().where("product_id", product_id).update(update);

  // Kiểm tra và xóa hình ảnh cũ nếu có
  if (
    update.product_image &&
    updatedProduct.product_image &&
    update.product_image !== updatedProduct.product_image &&
    updatedProduct.product_image.startsWith("/public/uploads")
  ) {
    unlink(`.${updatedProduct.product_image}`, (err) => {
      if (err) {
        console.error(`Failed to delete old image: ${err}`);
      }
    });
  }

  return { ...updatedProduct, ...update }; // Trả về sản phẩm đã cập nhật
}
async function deleteProduct(product_id) {
  const deletedProduct = await productRepository()
    .where('product_id', product_id)
    .select('product_image') // Thay đổi 'avatar' thành 'product_image' hoặc tên cột tương ứng với sản phẩm
    .first();
    
  if (!deletedProduct) {
    return null; // Nếu không tìm thấy sản phẩm
  }

  // Xóa sản phẩm từ cơ sở dữ liệu
  await productRepository().where('product_id', product_id).del();

  // Nếu có hình ảnh và bắt đầu bằng '/public/uploads', xóa tệp hình ảnh
  if (
    deletedProduct.product_image && // Thay đổi 'avatar' thành 'product_image' hoặc tên cột tương ứng với sản phẩm
    deletedProduct.product_image.startsWith('/public/uploads')
  ) {
    unlink(`.${deletedProduct.product_image}`, (err) => {
      if (err) {
        console.error(`Error deleting product_image: ${err}`); // Ghi log lỗi nếu có
      }
    });
  }

  return deletedProduct; // Trả về thông tin sản phẩm đã xóa
}
async function deleteAllProduct() {
  // Lấy danh sách tất cả hình ảnh của sản phẩm
  const products = await productRepository().select('product_image');

  // Xóa tất cả sản phẩm
  await productRepository().del();

  // Duyệt qua danh sách hình ảnh để xóa nếu có
  products.forEach((product) => {
    if (product.product_image && product.product_image.startsWith('/public/uploads')) {
      unlink(`.${product.product_image}`, (err) => {
        if (err) {
          console.error(`Error deleting image: ${err}`);
        }
      });
    }
  });
}
module.exports = {
    createProduct,
    getManyProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAllProduct,
};
