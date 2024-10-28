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
                <button type="submit" class="btn btn-success">Đặt hàng</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import cartService from '@/services/cart.service';

const customerName = ref('');
const customerPhone = ref('');
const customerEmail = ref('');
const customerAddress = ref('');
const deliveryMethod = ref('Giao tận nơi');
const paymentMethod = ref('Tiền mặt');

const cartItems = computed(() => {
    return cartService.getCart();
});

const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.product_price * item.quantity, 0);
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};

const updateQuantity = (item) => {
    if (item.quantity <= 0) {
        item.quantity = 1;
    }
    cartService.updateQuantity(item);
};

const removeFromCart = (cart_id) => {
    cartService.removeFromCart(cart_id);
};

const submitOrder = async () => {
    const customerData = {
        customer_name: customerName.value,
        customer_email: customerEmail.value,
        customer_phone: customerPhone.value,
        customer_address: customerAddress.value,
    };

    try {
        // Tạo khách hàng
        const customerResponse = await cartService.createCustomer(customerData);
        const customerId2 = customerResponse.customer_id; // Lấy ID của khách hàng mới tạo
        
        // Tạo đơn hàng chỉ khi có ID khách hàng hợp lệ
        const customerId = 1 ;
        console.log("in ra ne " + customerId);
        if (customerId) {
            const orderData = {
                customer_id: customerId,
                order_date: new Date().toISOString(),
                order_total: totalPrice.value,
                order_payment_method: paymentMethod.value,
                order_status: 'Confirming',
                order_note: '',
            };
            console.log("in ra ne " + orderData);
            await cartService.createOrder(orderData);
            alert('Đặt hàng thành công!');
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi đặt hàng:', error);
        alert('Đặt hàng thất bại. Vui lòng kiểm tra lại thông tin.');
    }
};
</script>

<style scoped>
.table img {
    max-width: 50px;
    height: auto;
}
</style>
