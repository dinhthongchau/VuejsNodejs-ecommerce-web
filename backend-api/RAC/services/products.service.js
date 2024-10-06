/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const knex = require("../database/knex");
const Paginator = require("./paginator");

function productRepository() {
  return knex("products");
}

async function createProduct(payload) {
  const [id] = await productRepository().insert(payload);
  return { id, ...payload };
}

async function getManyProducts(query) {
  const { name, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);

  let results = await productRepository()
    .where((builder) => {
      if (name) {
        builder.where("name", "like", `%${name}%`);
      }
    })
    .select("*")
    .limit(paginator.limit)
    .offset(paginator.offset);

  let totalRecords = results.length;

  return {
    metadata: paginator.getMetadata(totalRecords),
    products: results,
  };
}

async function getProductById(id) {
  return productRepository().where("id", id).select("*").first();
}

async function updateProduct(id, payload) {
  await productRepository().where("id", id).update(payload);
  return payload;
}

async function deleteProduct(id) {
  await productRepository().where("id", id).del();
  return { message: "Product deleted successfully" };
}

async function deleteAllProducts() {
  await productRepository().del();
  return { message: "All products deleted successfully" };
}

module.exports = {
  createProduct,
  getManyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
