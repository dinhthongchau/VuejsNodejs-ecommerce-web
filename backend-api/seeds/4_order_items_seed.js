

const { faker } = require('@faker-js/faker');

function createOrderItem(orderIds, productIds) {
    return {
        order_id: faker.helpers.arrayElement(orderIds), // get order_id from database
        product_id: faker.helpers.arrayElement(productIds), // get product_id from database
        product_name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: parseFloat(faker.commerce.price()),
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Get the list of order IDs and product IDs from the database
    const orderIds = (await knex('orders').select('id')).map(o => o.id);
    const productIds = (await knex('products').select('id')).map(p => p.id);

    await knex('order_items').del();
    await knex.raw('ALTER TABLE order_items AUTO_INCREMENT = 1');

    // Insert 20 new order_items
    await knex('order_items').insert(Array(20).fill().map(() => createOrderItem(orderIds, productIds)));
};
