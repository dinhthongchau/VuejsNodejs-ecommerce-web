const knex = require("../database/knex");
const Paginator = require("./paginator");
const { unlink } = require("node:fs");

function productRepository() {
  return knex("product");
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
   const parseJSONString = (jsonString) => {
     if (typeof jsonString === "string") {
       return JSON.parse(jsonString.replace(/\\/g, ""));
     }
     return jsonString;
   };

   // Chuyển đổi  và product_image nếu cần

   payload.product_image = parseJSONString(payload.product_image);
  const product = readProduct(payload);
  const [product_id] = await productRepository().insert(product);
  return { product_id, ...product };
}

async function getManyProducts(query) {
  try {
    const {
      product_name,
      product_price,
      product_color,
      page = 1,
      limit = 5,
    } = query;
    const paginator = new Paginator(page, limit);

    let results = await productRepository()
      .where((builder) => {
        if (product_name) {
          builder.where("product_name", "like", `%${product_name}%`);
        }
        if (product_price) {
          builder.where("product_price", "=", product_price);
        }
        if (product_color) {
          builder.where("product_color", "like", `%${product_color}%`);
        }
      })
      .select(
        knex.raw("count(product_id) OVER() AS recordCount"),
        "product_id",
        "product_name",
        "product_price",
        "product_color",
        "product_description",
        "product_image"
      )
      .limit(paginator.limit)
      .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordCount;
      delete result.recordCount;
      return result;
    });
  
    // 2. Phân tích chuỗi JSON sau khi lấy kết quả
    results = results.map((result) => {
      totalRecords = result.recordCount;
      result.product_image = JSON.parse(result.product_image); // Phân tích chuỗi JSON
      delete result.recordCount; // Xóa trường recordCount
      return result;
    });
    return {
      metadata: paginator.getMetadata(totalRecords),
      products: results,
    };
  } catch (error) {
    console.error("Error in getManyProducts:", error); // Ghi log lỗi
    throw new ApiError(500, "An error occurred while retrieving products");
  }
}

async function getProductById(product_id) {
  return productRepository()
    .where("product_id", product_id)
    .select("*")
    .first();
}

async function updateProduct(product_id, payload) {
  const updatedProduct = await productRepository()
    .where("product_id", product_id)
    .select("*")
    .first();

  if (!updatedProduct) {
    return null;
  }

  const update = readProduct(payload);

  if (!update.product_image) {
    delete update.product_image;
  }

  await productRepository().where("product_id", product_id).update(update);

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

  return { ...updatedProduct, ...update };
}
async function deleteProduct(product_id) {
  const deletedProduct = await productRepository()
    .where("product_id", product_id)
    .select("product_image")
    .first();

  if (!deletedProduct) {
    return null;
  }

  await productRepository().where("product_id", product_id).del();

  if (
    deletedProduct.product_image && // Thay đổi 'avatar' thành 'product_image' hoặc tên cột tương ứng với sản phẩm
    deletedProduct.product_image.startsWith("/public/uploads")
  ) {
    unlink(`.${deletedProduct.product_image}`, (err) => {
      if (err) {
        console.error(`Error deleting product_image: ${err}`);
      }
    });
  }

  return deletedProduct;
}

async function deleteAllProduct() {
  const products = await productRepository().select("product_image");

  await productRepository().del();

  products.forEach((product) => {
    if (
      product.product_image &&
      product.product_image.startsWith("/public/uploads")
    ) {
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
