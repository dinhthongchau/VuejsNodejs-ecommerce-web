exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('brand').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.integer('quantity').notNullable();
      table.text('description');
      table.json('specs');
      table.json('images');
      table.string('status').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
  };
  