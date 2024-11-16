<script setup>
const apiUrl = import.meta.env.VITE_API_URL;
import { ref, onMounted } from 'vue';
const props = defineProps({
    order: { type: Object, required: true },
});
console.log('API Respon3se:', props.order.customer_id);
const customer = ref(null);
const baseUrl_2 = `${apiUrl}/v1/customers`;
const customer_name_from_id = ref('');
const customer_phone_from_id = ref('');
const customer_mail_from_id = ref('');

// Fetch customer details by customer_id
async function fetchCustomer(id) {
    try {
        const response = await fetch(`${baseUrl_2}/${id}`);
        const data = await response.json();
        if (data && data.data && data.data.customer) {
            customer_name_from_id.value = data.data.customer.customer_name;
            customer_phone_from_id.value = data.data.customer.customer_phone;
            customer_mail_from_id.value = data.data.customer.customer_email;
            console.log("check ten " + customer_name_from_id.value)
        }
        return data.customer;


    } catch (error) {
        console.error("Error fetching customer data", error);
    }
}

// On component mount, fetch customer data
onMounted(async () => {
    const customerData = await fetchCustomer(props.order.customer_id);
    customer.value = customerData;
});

function formatOrderNote(note) {
    if (!note) return '';
    // Tách chuỗi theo dấu phẩy và loại bỏ khoảng trắng thừa
    const items = note.split(',').map(item => item.trim());
    // Nối các phần tử lại với thẻ <br>
    return items.join('<br>');
}

function formatCurrency(amount) {
    // Sử dụng toLocaleString để phân cách số theo kiểu 10.000.000
    return amount.toLocaleString('vi-VN');
}

</script>

<template>
    <div>
        <div class="p-1">
            <strong>ID đơn hàng:</strong>
            {{ order.order_id }}
        </div>
        <div class="p-1">
            <strong>ID khách hàng:</strong>
            {{ order.customer_id }}
        </div>

        <div class="p-1">
            <strong>Tên khách hàng:</strong>
            {{ customer_name_from_id }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ customer_phone_from_id }}
        </div>
        <div class="p-1">
            <strong>Email:</strong>
            {{ customer_mail_from_id }}
        </div>
        <div class="p-1">
            <strong>Ngày đặt hàng:</strong>
            {{ order.order_date }}
        </div>
        <div class="p-1">
            <strong>Tổng đơn hàng:</strong>
            {{ formatCurrency(order.order_total) }} đ
        </div>

        <div class="p-1">
            <strong>Phương thức thanh toán:</strong>
            {{ order.order_payment_method }}
        </div>
        <div class="p-1">
            <strong>Trạng thái đơn hàng:</strong>
            {{ order.order_status }}
        </div>
        <div class="p-1">
            <strong>Ghi chú đơn hàng:</strong>
            <div v-html="formatOrderNote(order.order_note)"></div> <!-- Thay về v-html để hiển thị HTML -->

        </div>
    </div>
</template>
