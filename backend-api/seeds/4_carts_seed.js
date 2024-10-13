const { faker } = require('@faker-js/faker');

function createCart(customerId, productId) {
    return {
        customer_id: customerId,
        product_id: productId,
        quantity: faker.number.int({ min: 1, max: 5 }),  // Số lượng sản phẩm trong giỏ từ 1 đến 5
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('Cart').del();
    await knex.raw('ALTER TABLE Cart AUTO_INCREMENT = 1');
    
    const customers = await knex('Customer').select('customer_id');
    const products = await knex('Product').select('product_id');
    
    const carts = [];
    customers.forEach((customer) => {
        const numCarts = faker.number.int({ min: 1, max: 3 });  // Mỗi khách hàng có từ 1 đến 3 sản phẩm trong giỏ
        for (let i = 0; i < numCarts; i++) {
            const product = faker.helpers.arrayElement(products);
            carts.push(createCart(customer.customer_id, product.product_id));
        }
    });

    await knex('Cart').insert(carts);
};
