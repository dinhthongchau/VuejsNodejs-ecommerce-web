<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

const customer = ref({
    customer_name: 'Nguyen Van A',
    customer_email: 'nva@gmail.com',
    customer_phone: '0889281111',
    customer_address: 'CanTho,NinhKieu,XuanKhanh',
});

const message = ref('');

async function onCreateCustomer() {
    try {
        const formData = new FormData();
        formData.append('customer_name', customer.value.customer_name);
        formData.append('customer_email', customer.value.customer_email);
        formData.append('customer_phone', customer.value.customer_phone);
        formData.append('customer_address', customer.value.customer_address);

    

        const response = await fetch('http://localhost:3300/api/v1/customers', {
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
        message.value = 'Khách hàng được tạo thành công!';
        console.log(result);
    } catch (error) {
        console.error(error);
        message.value = 'Tạo khách hàng thất bại.';
    }
}
</script>

<template>
    <Form class="form-container" @submit="onCreateCustomer">
        <h1>Thêm mới khách hàng</h1>
        <div class="mb-3">
            <label for="customer_name" class="form-label">Tên khách hàng:</label>
            <Field name="customer_name" v-model="customer.customer_name" type="text" class="form-control" />
            <ErrorMessage name="customer_name" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="customer_email" class="form-label">Email:</label>
            <Field name="customer_email" v-model="customer.customer_email" type="text" class="form-control" />
            <ErrorMessage name="customer_email" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="customer_phone" class="form-label">SDT:</label>
            <Field name="customer_phone" v-model="customer.customer_phone" type="text" class="form-control" />
            <ErrorMessage name="customer_phone" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="customer_address" class="form-label ">Address:</label>
            <Field name="customer_address" v-model="customer.customer_address"
                class="form-control description-field" as="textarea" />
            <ErrorMessage name="customer_address" class="error-feedback" />
        </div>

        

        <div class="mb-3">
            <button class="btn btn-primary"><i class="fas fa-save"></i> Tạo khách hàng</button>
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


</style>
