const knex = require("../database/knex");
const Paginator = require("./paginator");
const { Storage } = require("@google-cloud/storage");

const storageOptions = {
  projectId: "project1-flutter-454507",
};

// Chỉ thêm keyFilename nếu chạy local (dựa trên biến môi trường)
if (process.env.NODE_ENV !== "production") {
  storageOptions.keyFilename =
    "C:/Users/chaud/cdthong/OLD/ct313h03-project-dinhthongchau/backend-api/src/services/project1-flutter-454507-3a3315a078e1.json";
}

const storage = new Storage(storageOptions);
const bucketName = "project1-flutter-454507.appspot.com";
const bucket = storage.bucket(bucketName);

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

    return {
      metadata: paginator.getMetadata(totalRecords),
      products: results,
    };
  } catch (error) {
    console.error("Error in getManyProducts:", error);
    throw new Error("An error occurred while retrieving products");
  }
}

async function getProductById(product_id) {
  return productRepository()
    .where("product_id", product_id)
    .select("*")
    .first();
}
// product.service.js
async function createProduct(productData) {
  const product = readProduct(productData);
  // product_image đã là chuỗi JSON từ controller, không cần xử lý thêm
  const [product_id] = await productRepository().insert(product);
  return { product_id, ...product };
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
  if (payload.gcsUrls && payload.gcsUrls.length > 0) {
    update.product_image = JSON.stringify(payload.gcsUrls);
  }

  await productRepository().where("product_id", product_id).update(update);
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
    deletedProduct.product_image &&
    deletedProduct.product_image.startsWith("https://storage.googleapis.com")
  ) {
    const fileName = deletedProduct.product_image.split(`${bucketName}/`)[1];
    try {
      await bucket.file(fileName).delete();
      console.log(`Deleted file from GCS: ${fileName}`);
    } catch (err) {
      console.error(`Error deleting file from GCS: ${err}`);
    }
  }

  return deletedProduct;
}

async function deleteAllProduct() {
  const products = await productRepository().select("product_image");

  await productRepository().del();

  for (const product of products) {
    if (
      product.product_image &&
      product.product_image.startsWith("https://storage.googleapis.com")
    ) {
      const fileName = product.product_image.split(`${bucketName}/`)[1];
      try {
        await bucket.file(fileName).delete();
        console.log(`Deleted file from GCS: ${fileName}`);
      } catch (err) {
        console.error(`Error deleting file from GCS: ${err}`);
      }
    }
  }
}

module.exports = {
  createProduct,
  getManyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
};
