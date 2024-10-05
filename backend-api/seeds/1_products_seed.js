

const { faker } = require('@faker-js/faker');

function createProduct() {
    return {
        name: faker.commerce.productName(),
        brand: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        quantity: faker.number.int({ min: 1, max: 20 }),
        description: faker.commerce.productDescription(),
        specs: JSON.stringify({
            color: faker.color.human(),
            storage: `${faker.number.int({ min: 64, max: 512 })}GB`
        }),
        images: JSON.stringify([faker.image.url(), faker.image.url()]),
        status: faker.datatype.boolean() ? 'available' : 'unavailable',
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    
    await knex('products').del();
    await knex.raw('ALTER TABLE products AUTO_INCREMENT = 1');

    // Insert 10 new records 
    await knex('products').insert(Array(10).fill().map(createProduct));
};
