exports.seed = async function(knex) {
    await knex('order_items').del(); // Xóa dữ liệu trong bảng order_items
    await knex('orders').del();       // Xóa dữ liệu trong bảng orders
    await knex('customers').del();    // Xóa dữ liệu trong bảng customers
    await knex('products').del();     // Xóa dữ liệu trong bảng products
  };
  