const { faker } = require('@faker-js/faker');

function createOrder() {
    return {
        customer_id: faker.number.int({ min: 401, max: 420 }), // sua gia tri customer neu can
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
    await knex('orders').del();
    await knex('orders').insert(Array(30).fill().map(createOrder));
};
