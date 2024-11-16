<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';


const order = ref({
    customer_id: 25,
    order_date: '2024-11-15T06:33:45.507Z',
    order_total: 10000000,
    order_payment_method: 'Cash on delivery',
    order_status: 'OK',
    order_note: ',SP:\n SL:\n ,Ghi chú: '
});

const message = ref('');
const apiUrl = import.meta.env.VITE_API_URL;
async function onCreateOrder() {
    try {
        const formData = new FormData();
        formData.append('customer_id', order.value.customer_id);
        formData.append('order_date', order.value.order_date);
        formData.append('order_total', order.value.order_total);
        formData.append('order_payment_method', order.value.order_payment_method);
        formData.append('order_status', order.value.order_status);
        formData.append('order_note', order.value.order_note);

        const response = await fetch(`${apiUrl}/v1/orders`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        message.value = 'Đơn hàng được tạo thành công!';
        console.log(result);
    } catch (error) {
        console.error(error);
        message.value = 'Tạo đơn hàng thất bại.';
    }
}
</script>

<template>
    <Form class="form-container" @submit="onCreateOrder">
        <h1>Thêm mới đơn hàng</h1>


        <!-- Customer ID -->
        <div class="mb-3">
            <label for="customer_id" class="form-label">ID Khách Hàng:</label>
            <Field name="customer_id" v-model="order.customer_id" type="number" class="form-control" />
            <ErrorMessage name="customer_id" class="error-feedback" />
        </div>

        <!-- Order Date -->
        <div class="mb-3">
            <label for="order_date" class="form-label">Ngày Đặt Hàng:</label>
            <Field name="order_date" v-model="order.order_date" type="datetime-local" class="form-control" />
            <ErrorMessage name="order_date" class="error-feedback" />
        </div>

        <!-- Order Total -->
        <div class="mb-3">
            <label for="order_total" class="form-label">Tổng Tiền:</label>
            <Field name="order_total" v-model="order.order_total" type="number" class="form-control" />
            <ErrorMessage name="order_total" class="error-feedback" />
        </div>

        <!-- Payment Method -->
        <div class="mb-3">
            <label for="order_payment_method" class="form-label">Phương Thức Thanh Toán:</label>
            <Field name="order_payment_method" v-model="order.order_payment_method" type="text" class="form-control" />
            <ErrorMessage name="order_payment_method" class="error-feedback" />
        </div>

        <!-- Order Status -->
        <div class="mb-3">
            <label for="order_status" class="form-label">Trạng Thái Đơn Hàng:</label>
            <Field name="order_status" v-model="order.order_status" type="text" class="form-control" />
            <ErrorMessage name="order_status" class="error-feedback" />
        </div>

        <!-- Order Note -->
        <div class="mb-3">
            <label for="order_note" class="form-label">Sản phẩm Đơn Hàng:</label>
            <Field name="order_note" v-model="order.order_note" as="textarea" class="form-control description-field" />
            <ErrorMessage name="order_note" class="error-feedback" />
        </div>

        <div class="mb-3">
            <button class="btn btn-primary"><i class="fas fa-save"></i> Tạo đơn hàng</button>
        </div>
    </Form>
    <p>{{ message }}</p>
</template>

<style scoped>
.form-container {
    max-width: 600px;
    margin: auto;
}

.error-feedback {
    color: red;
    font-size: 0.875em;
}

.description-field {
    height: 200px;
}
</style>
