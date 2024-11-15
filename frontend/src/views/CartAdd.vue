<template>
    <div class="cart-container container mx-auto">
        <h1 class="h3 mb-4 text-center">Giỏ Hàng của bạn</h1>
        <div v-if="cartItems.length === 0" class="text-center">
            <p>Giỏ hàng của bạn hiện đang trống.</p>
            <router-link to="/" class="btn btn-primary">Tiếp tục mua sắm</router-link>
        </div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cartItems" :key="item.cart_id">
                        <td>
                            <div class="d-flex align-items-center">
                                <span>{{ item.product_name }}</span>
                            </div>
                        </td>
                        <td>{{ formatPrice(item.product_price) }} đ</td>
                        <td>
                            <input type="number" v-model.number="item.quantity" @change="updateQuantity(item)" min="1"
                                class="form-control" />
                        </td>
                        <td>{{ formatPrice(item.product_price * item.quantity) }} đ</td>
                        <td>
                            <button class="btn btn-danger" @click="removeFromCart(item.cart_id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3>Tạm tính: {{ formatPrice(totalPrice) }} đ</h3>

            <h4 class="mt-4">Thông tin khách hàng</h4>
            <form @submit.prevent="submitOrder">
                <div class="mb-3">
                    <label for="customerName" class="form-label">Họ và Tên</label>
                    <input type="text" id="customerName" v-model="customerName" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label for="customerPhone" class="form-label">Số điện thoại</label>
                    <input type="tel" id="customerPhone" v-model="customerPhone" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label for="customerEmail" class="form-label">Email</label>
                    <input type="email" id="customerEmail" v-model="customerEmail" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label for="customerAddress" class="form-label">Địa chỉ giao hàng</label>
                    <input type="text" id="customerAddress" v-model="customerAddress" class="form-control" required />
                </div>
                <LocationPicker :selectedLocation="TinhPhuongXa" />


                <div class="mb-3">
                    <label for="customerNote" class="form-label">Ghi chú ( nếu có )</label>
                    <input type="text" id="customerNote" v-model="customerNote" class="form-control" required />
                </div>
                <button @click="confirmCustomer" class="btn btn-primary">Xác nhận thông tin </button>
                <div class="mb-3">
                    <label class="form-label">Chọn hình thức nhận hàng</label>
                    <div>
                        <label><input type="radio" v-model="deliveryMethod" value="Giao tận nơi" /> Giao tận nơi</label>
                        <label><input type="radio" v-model="deliveryMethod" value="Nhận tại cửa hàng" /> Nhận tại cửa
                            hàng</label>
                    </div>
                </div>
                <h4 class="mt-4">Chọn hình thức thanh toán</h4>
                <div class="mb-3">
                    <select v-model="paymentMethod" class="form-select" required>
                        <option value="Tiền mặt">Tiền mặt</option>
                        <option value="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-success" :disabled="!isCustomerConfirmed">Đặt hàng</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import cartService from '@/services/cart.service';
const isCustomerConfirmed = ref(false); // Trạng thái xác nhận khách hàng
const customerId = ref(''); // Lưu ID khách hàng khi tạo thành công
const customerName = ref('');
const customerPhone = ref('');
const customerEmail = ref('');
const customerAddress = ref('');
const deliveryMethod = ref('Giao tận nơi');
const paymentMethod = ref('Tiền mặt');
const customerNote = ref('Không');
const TinhPhuongXa = ref('');
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
console.log("value ne " + TinhPhuongXa.value);
// const cartItems = computed(() => {
//     return JSON.parse(localStorage.getItem('cart')) || [];
// });

const cartItems = ref(JSON.parse(localStorage.getItem('cart')) || []);




const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.product_price * item.quantity, 0);
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};

const updateQuantity = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(i => i.product_id === item.product_id);
    if (cartItem) {
        cartItem.quantity = item.quantity > 0 ? item.quantity : 1;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};








const submitOrder = async () => {
    if (!isCustomerConfirmed.value) {
        alert('Vui lòng xác nhận thông tin khách hàng trước khi đặt hàng.');
        return;
    }


    try {
        // console.log("Ne 2 \n" + cartItems.value.map((item, index) =>
        //     `SP${index + 1}: ${item.product_name} SL: ${item.quantity}`
        // ).join(',\n') + `\nGhi chu cua khach: ` + customerNote.value);
        if (customerId.value) {
            const orderData = {
                customer_id: customerId.value,
                order_date: new Date().toISOString(),
                order_total: totalPrice.value,
                order_payment_method: paymentMethod.value,
                order_status: 'Confirming',
                order_note: cartItems.value.map((item, index) =>
                    `SP${index + 1}: ${item.product_name} SL: ${item.quantity}`
                ).join(',\n') + `\n,Ghi chu cua khach: ` + customerNote.value,
            };
            // Xoá giỏ hàng trong localStorage và cập nhật lại giỏ hàng
            localStorage.removeItem('cart');
            cartItems.value = [];

            // Quay về trang chủ
            router.push('/');
            await cartService.createOrder(orderData);
            alert('Đặt hàng thành công!');
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi đặt hàng:', error);
        alert('Đặt hàng thất bại. Vui lòng kiểm tra lại thông tin.');
    }
};


const confirmCustomer = async () => {
    const customerData = {
        customer_id: generateUniqueCustomerId(),
        customer_name: customerName.value,
        customer_email: customerEmail.value,
        customer_phone: customerPhone.value,
        customer_address: customerAddress.value,
    };

    customerId.value = customerData.customer_id;
    console.log("Ne id  " + customerId.value);
    try {
        const response = await fetch('/api/v1/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });


        if (!response.ok) {
            throw new Error('Không thể tạo khách hàng. Vui lòng thử lại.');
        }


        const customerResponse = await response.json();


        isCustomerConfirmed.value = true;
        alert('Xác nhận thông tin khách hàng thành công!');
    } catch (error) {
        console.error('Lỗi xác nhận khách hàng:', error);
        alert('Xác nhận thất bại. Vui lòng kiểm tra lại thông tin.');
    }
};



const existingIds = new Set(); // Set để lưu trữ các ID đã được tạo

function generateUniqueCustomerId() {
    // Lấy ngày tháng hiện tại
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); // Ngày (DD)
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng (MM) +1 vì tháng bắt đầu từ 0
    const year = String(now.getFullYear()).slice(-2); // Năm (YY)

    const dateStr = `${day}${month}${year}`; // Định dạng DDMMYY

    let customerId;
    do {
        // Tạo 3 số ngẫu nhiên từ 000 đến 999
        const randomNum = Math.floor(Math.random() * 900) + 100; // Tạo số từ 100 đến 999
        const randomDigits = randomNum.toString(); // Chuyển sang chuỗi

        // Kết hợp tất cả lại để tạo ID khách hàng
        customerId = `${dateStr}${randomDigits}`;
    } while (existingIds.has(customerId)); // Kiểm tra xem ID đã tồn tại hay chưa

    // Lưu ID mới vào Set
    existingIds.add(customerId);

    return customerId;
}

const removeFromCart = (cartId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('CartId cần xóa:', cartId);
    console.log('Giỏ hàng trước khi xóa:', cart);

    // Tìm index của sản phẩm cần xóa
    const index = cart.findIndex(item => item.cart_id === cartId);
    console.log('Index tìm được:', index);

    if (index !== -1) {
        // Chỉ xóa một sản phẩm tại index tìm được
        cart.splice(index, 1);
        console.log('Giỏ hàng sau khi xóa:', cart);

        localStorage.setItem('cart', JSON.stringify(cart));
        cartItems.value = cart;
    } else {
        console.log('Không tìm thấy sản phẩm với cart_id:', cartId);
    }
};


import { watch } from 'vue';

watch(() => localStorage.getItem('cart'), () => {
    cartItems.value = JSON.parse(localStorage.getItem('cart')) || [];
});

import LocationPicker from './LocationPicker.vue';
</script>

<style scoped>
.table img {
    max-width: 50px;
    height: auto;
}
</style>