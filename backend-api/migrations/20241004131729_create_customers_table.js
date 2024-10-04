exports.up = function(knex) {
    return knex.schema.createTable('customers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone').notNullable();
      table.text('address').notNullable();
      table.string('password').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customers');
  };
  