

const { faker } = require('@faker-js/faker');

function createOrder(customerIds) {
    return {
        customer_id: faker.helpers.arrayElement(customerIds), // get customer_id from database
        order_date: faker.date.recent(),
        total_amount: parseFloat((faker.number.int({ min: 1, max: 1000 }) + faker.number.int({ min: 1, max: 500 })).toFixed(2)),
        status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered', 'canceled']),
        payment_method: faker.helpers.arrayElement(['credit card', 'cash on delivery', 'paypal']),
        notes: faker.lorem.sentence(),
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Get the list of customer IDs from the database
    const customerIds = (await knex('customers').select('id')).map(c => c.id);

    await knex('orders').del();
    await knex.raw('ALTER TABLE orders AUTO_INCREMENT = 1');

    // Insert 10 new orders
    await knex('orders').insert(Array(10).fill().map(() => createOrder(customerIds)));
};
