const { faker } = require('@faker-js/faker');

function createProduct() {
    const models = ['iPhone 11', 'iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15'];
    const colors = ['Đen', 'Trắng', 'Đỏ', 'Xanh', 'Xanh dương', 'Vàng', 'Hồng'];
    const storageOptions = ['64GB', '128GB', '256GB', '512GB'];

    return {
        product_name: `${faker.helpers.arrayElement(models)} ${faker.helpers.arrayElement(storageOptions)}`,
        product_price: faker.number.int({ min: 15000000, max: 35000000 }), // Giá từ 15 triệu đến 35 triệu VND
        product_color: faker.helpers.arrayElement(colors),
        product_description: faker.commerce.productDescription(),
        product_image: JSON.stringify([
            `https://dummyimage.com/640x480/000/fff&text=Product+Image+1`,
            `https://dummyimage.com/640x480/000/fff&text=Product+Image+2`,
            `https://dummyimage.com/640x480/000/fff&text=Product+Image+3`
        ]),
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('Product').del();
    await knex.raw('ALTER TABLE Product AUTO_INCREMENT = 1');
    await knex('Product').insert(Array(20).fill().map(createProduct));
};
