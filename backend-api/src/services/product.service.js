const knex = require("../database/knex");

function productRepository() {
  return knex("ct313h_projects");
}

function readProduct(payload) {
  return {
    id: payload.id,
    name: payload.name,
    brand: payload.brand,
    price: payload.price,
    quantity: payload.quantity,
    description: payload.description,
    specs: payload.specs,
    images: payload.images,
    status: payload.status,
  };
}

async function createProduct(payload) {

    const product = readProduct(payload);
    const [id] = await productRepository().insert(product);
    return { id, ...product };
  }
module.exports = {
    createProduct,
}