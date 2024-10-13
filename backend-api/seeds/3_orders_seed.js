const { faker } = require('@faker-js/faker');

function createOrder(customerId) {
    const paymentMethods = ['Credit Card', 'Cash on Delivery', 'PayPal', 'Bank Transfer'];
    const statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];

    return {
        customer_id: customerId,
        order_total: faker.commerce.price({ min: 500000, max: 1000000, dec: 2 }), // Giả sử tổng giá trị đơn hàng từ 500,000 VND đến 1,000,000 VND
        order_payment_method: faker.helpers.arrayElement(paymentMethods),
        order_status: faker.helpers.arrayElement(statuses),
        order_note: faker.lorem.sentence(),
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('Orders').del();
    await knex.raw('ALTER TABLE Orders AUTO_INCREMENT = 1');
    
    // Giả sử có 20 khách hàng, bạn có thể thay đổi nếu có thêm dữ liệu khách hàng
    const customers = await knex('Customer').select('customer_id');
    
    const orders = customers.map((customer) => createOrder(customer.customer_id));
    await knex('Orders').insert(orders);
};
