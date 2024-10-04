const { faker } = require('@faker-js/faker');

function createCustomer() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('09########'),
        address: faker.location.streetAddress(),
        password: faker.internet.password(),
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('customers').del();
    await knex('customers').insert(Array(20).fill().map(createCustomer));
};
