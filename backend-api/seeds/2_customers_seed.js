const { faker } = require('@faker-js/faker');

// Danh sách thành phố ở Việt Nam
const vietnamCities = ['Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Nha Trang', 'Hải Phòng', 'Cần Thơ'];

// Hàm tạo dữ liệu giả cho khách hàng
function createCustomer() {
    return {
        customer_name: faker.person.fullName(), // Tên ngẫu nhiên
        customer_email: faker.internet.email(), // Email ngẫu nhiên
        customer_phone: `09${faker.number.int({ min: 10000000, max: 99999999 })}`, // Số điện thoại bắt đầu bằng 09
        customer_address: `${faker.location.streetAddress()}, ${faker.helpers.arrayElement(vietnamCities)}, Việt Nam`, // Địa chỉ ngẫu nhiên ở Việt Nam
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('Customer').del(); // Xóa dữ liệu cũ trong bảng Customer
    await knex.raw('ALTER TABLE Customer AUTO_INCREMENT = 1'); // Đặt lại giá trị tự động tăng
    await knex('Customer').insert(Array(20).fill().map(createCustomer)); // Chèn 20 khách hàng ngẫu nhiên
};