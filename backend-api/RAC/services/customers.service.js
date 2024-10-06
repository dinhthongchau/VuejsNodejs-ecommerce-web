/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const knex = require("../database/knex");
const Paginator = require("./paginator");

function customerRepository() {
  return knex("customers");
}

function readCustomer(payload) {
  return {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    address: payload.address,
  };
}

async function createCustomer(payload) {
  const customer = readCustomer(payload);
  const [id] = await customerRepository().insert(customer);
  return { id, ...customer };
}

async function getManyCustomers(query) {
  const { name, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);
  let results = await customerRepository()
    .where((builder) => {
      if (name) {
        builder.where("name", "like", `%${name}%`);
      }
    })
    .select(
      knex.raw("count(id) OVER() AS recordCount"),
      "id",
      "name",
      "email",
      "phone",
      "address"
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
    customers: results,
  };
}

async function getCustomerById(id) {
  return customerRepository().where("id", id).select("*").first();
}

async function updateCustomer(id, payload) {
  const update = readCustomer(payload);
  await customerRepository().where("id", id).update(update);
  return update;
}

async function deleteCustomer(id) {
  await customerRepository().where("id", id).del();
  return { message: "Customer deleted successfully" };
}

module.exports = {
  createCustomer,
  getManyCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
