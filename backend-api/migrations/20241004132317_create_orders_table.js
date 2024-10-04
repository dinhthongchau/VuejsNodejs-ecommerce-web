exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('customer_id').unsigned().notNullable()
        .references('id').inTable('customers');
      table.timestamp('order_date').defaultTo(knex.fn.now());
      table.decimal('total_amount', 10, 2).notNullable();
      table.string('status').notNullable();
      table.string('payment_method').notNullable();
      table.text('notes');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
  };