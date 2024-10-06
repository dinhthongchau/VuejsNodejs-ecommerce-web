/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const knex = require("../database/knex");
const Paginator = require("./paginator");

function orderRepository() {
  return knex("orders");
}

async function createOrder(payload) {
  const [id] = await orderRepository().insert(payload);
  return { id, ...payload };
}

async function getManyOrders(query) {
  const { customerId, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);

  let results = await orderRepository()
    .where((builder) => {
      if (customerId) {
        builder.where("customer_id", customerId);
      }
    })
    .select("*")
    .limit(paginator.limit)
    .offset(paginator.offset);

  let totalRecords = results.length;

  return {
    metadata: paginator.getMetadata(totalRecords),
    orders: results,
  };
}

async function getOrderById(id) {
  return orderRepository().where("id", id).select("*").first();
}

async function updateOrder(id, payload) {
  await orderRepository().where("id", id).update(payload);
  return payload;
}

async function deleteOrder(id) {
  await orderRepository().where("id", id).del();
  return { message: "Order deleted successfully" };
}

module.exports = {
  createOrder,
  getManyOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
