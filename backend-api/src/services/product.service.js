const knex = require('../database/knex');

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
  const [id] = await productRepository().insert(product); // Chèn sản phẩm vào cơ sở dữ liệu và lấy ID
  return { product_id: id, ...product }; // Trả về ID cùng với thông tin sản phẩm
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

// async function updateProduct(productId, payload) {
//     const productData = readProduct(payload);
//     const [updatedProduct] = await productRepository().where('product_id', productId).update(productData).returning('*');
//     return updatedProduct;
// }

// async function deleteProduct(productId) {
//     await productRepository().where('product_id', productId).del();
// }

module.exports = {
    createProduct,
    
};

// getAllProducts,
//     getProductById,
//     updateProduct,
//     deleteProduct,
