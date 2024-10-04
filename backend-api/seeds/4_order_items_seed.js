const { faker } = require('@faker-js/faker');

function createOrderItem() {
    return {
        order_id: faker.number.int({ min: 91, max: 111 }), //edit
        product_id: faker.number.int({ min: 151, max: 171 }), //edit
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
    await knex('order_items').del();
    await knex('order_items').insert(Array(20).fill().map(createOrderItem));
};
