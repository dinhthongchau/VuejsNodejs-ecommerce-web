const knex = require("../database/knex");
const Paginator = require("./paginator");
//const { unlink } = require('node:fs');
const bcrypt = require("bcrypt");

function adminRepository() {
  return knex("admins");
}

function readAdmin(payload) {
  return {
    admin_id: payload.admin_id,
    admin_username: payload.admin_username,
    admin_password: payload.admin_password,
  };
}

async function createAdmin(payload) {
  const hashedPassword = await bcrypt.hash(payload.admin_password, 10);
  const admin = readAdmin({
    ...payload,
    admin_password: hashedPassword,
  });
  const [admin_id] = await adminRepository().insert(admin);
  return { admin_id, ...admin };
}

async function verifyAdmin(username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }
  const admin = await knex("Admins")
    .where({ admin_username: username })
    .first();
  const isMatch = await bcrypt.compare(password, admin.admin_password);
  if (!isMatch) {
    throw new Error("Mật khẩu không chính xác.");
  }
  return {
    admin_id: admin.admin_id,
    admin_username: admin.admin_username,
    admin_password: admin.admin_password,
  };
}

const checkExistAdmin = async (username) => {
  const admin = await knex("Admins")
    .where({ admin_username: username })
    .first();
  return admin;
};

module.exports = {
    createAdmin,
    verifyAdmin,
    checkExistAdmin
};
