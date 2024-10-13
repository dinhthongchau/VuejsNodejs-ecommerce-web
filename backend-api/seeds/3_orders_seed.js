const { faker } = require('@faker-js/faker');

function createOrder(customerId) {
    const paymentMethods = ['Bank Transfer', 'Cash on Delivery']; // Chỉ cho phép chuyển khoản hoặc thanh toán khi nhận hàng
    const statuses = ['Confirming', 'Confirmed']; // Chỉ có trạng thái Confirming và Confirmed

    return {
        customer_id: customerId,
        order_total: faker.commerce.price({ min: 500000, max: 1000000, dec: 2 }), // Giá trị đơn hàng VNĐ
        order_payment_method: faker.helpers.arrayElement(paymentMethods),
        order_status: faker.helpers.arrayElement(statuses),
        order_note: faker.lorem.sentence(), // Ghi chú bằng tiếng Anh
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
