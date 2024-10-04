exports.up = function(knex) {
    return knex.schema.createTable('order_items', (table) => {
      table.increments('id').primary();  // Unique identifier for the order item
      table.integer('order_id').unsigned().notNullable()
        .references('id').inTable('orders').onDelete('CASCADE');  // Reference to orders table
      table.integer('product_id').unsigned().notNullable()
        .references('id').inTable('products');  // Reference to products table
      table.string('product_name').notNullable();  // Name of the product at the time of order
      table.integer('quantity').notNullable();  // Quantity of the product ordered
      table.decimal('price', 10, 2).notNullable();  // Price of the product at the time of order
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('order_items');  // Xóa bảng order_items nếu tồn tại
  };
  