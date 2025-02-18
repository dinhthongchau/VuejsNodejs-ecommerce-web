const knex = require("../database/knex");
const Paginator = require("./paginator");
const { unlink } = require("node:fs");

function productRepository() {
  return knex("Product");
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
// async function createProduct(payload) {

//   const product = readProduct(payload);
//   const [product_id] = await productRepository().insert(product);
//   return { product_id, ...product };
// }
async function createProduct(payload) {
  const parseJSONString = (jsonString) => {
    if (typeof jsonString === "string") {
      return JSON.parse(jsonString.replace(/\\/g, ""));
    }
    return jsonString;
  };

  // Chuyển đổi product_color và product_image nếu cần
  payload.product_color = parseJSONString(payload.product_color);
  payload.product_image = parseJSONString(payload.product_image);

  // Tạo đối tượng product với các trường cần thiết
  const product = readProduct(payload);

  // Chèn vào cơ sở dữ liệu
  const [product_id] = await productRepository().insert({
    ...product,
    product_color: JSON.stringify(payload.product_color), // Chuyển đổi thành JSON string
    product_image: JSON.stringify(payload.product_image), // Chuyển đổi thành JSON string
  });

  return { product_id, ...product };
}

// async function getManyProducts(query) {
//   try {
//     const {
//       product_name,
//       product_price,
//       product_color,
//       page = 1,
//       limit = 5,
//     } = query;
//     const paginator = new Paginator(page, limit);

//     let results = await productRepository()
//       .where((builder) => {
//         if (product_name) {
//           builder.where("product_name", "like", `%${product_name}%`);
//         }
//         if (product_price) {
//           builder.where("product_price", "=", product_price);
//         }
//         if (product_color) {
//           builder.where("product_color", "like", `%${product_color}%`);
//         }
//       })
//       .select(
//         knex.raw("count(product_id) OVER() AS recordCount"),
//         "product_id",
//         "product_name",
//         "product_price",
//         "product_color",
//         "product_description",
//         "product_image"
//       )
//       .limit(paginator.limit)
//       .offset(paginator.offset);

//     let totalRecords = 0;
//     results = results.map((result) => {
//       totalRecords = result.recordCount;
//       delete result.recordCount;
//       return result;
//     });

//     return {
//       metadata: paginator.getMetadata(totalRecords),
//       products: results,
//     };
//   } catch (error) {
//     console.error("Error in getManyProducts:", error); // Ghi log lỗi
//     throw new ApiError(500, "An error occurred while retrieving products");
//   }
// }

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
    // 1. Sửa phần kiểm tra product_color trong truy vấn
    if (product_color) {
      // Chuyển đổi product_color thành JSON để so sánh
      builder.whereRaw("product_color::jsonb @> ?", [product_color]); // Sử dụng whereRaw để kiểm tra JSON
    }
    // 2. Phân tích chuỗi JSON sau khi lấy kết quả
    results = results.map((result) => {
      totalRecords = result.recordCount;
      result.product_color = JSON.parse(result.product_color); // Phân tích chuỗi JSON
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

//update
async function updateProduct(product_id, payload) {
  if (!product_id) {
    throw new Error("Missing product_id");
  }

  const updatedProduct = await productRepository()
    .where("product_id", product_id)
    .select("*")
    .first();

  if (!updatedProduct) {
    throw new Error(`Product with id=${product_id} not found`);
  }

  const update = readProduct(payload);

  // Kiểm tra và chỉ JSON.stringify nếu giá trị không phải là JSON hợp lệ
  const parseIfNeeded = (value) => {
    if (typeof value == "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed]; // Đảm bảo lưu dạng mảng
      } catch (e) {
        return [value]; // Nếu không phải JSON, đóng gói thành mảng
      }
    }
    return value;
  };

  // Áp dụng cho `product_color` và `product_image`
  if (update.product_color) {
    update.product_color = JSON.stringify(parseIfNeeded(update.product_color));
  }
  if (update.product_image) {
    update.product_image = JSON.stringify(parseIfNeeded(update.product_image));
  }

  await productRepository().where("product_id", product_id).update(update);

  return { ...updatedProduct, ...update };
}

//DELETE

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
