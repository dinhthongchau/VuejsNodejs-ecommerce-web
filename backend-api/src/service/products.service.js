const knex = require("../database/knex");

function productRepository() {
  return knex("ct313h_project");
}

function readContact(payload) {
  return {
    name: payload.name,
    email: payload.email,
    address: payload.address,
    phone: payload.phone,
    favorite: payload.favorite,
    avatar: payload.avatar,
  };
}
