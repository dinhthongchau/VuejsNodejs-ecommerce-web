<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

const product = ref({
    product_name: 'Iphone 14 128GB',
    product_price: 10000000,
    product_color: 'Trắng',
    product_description: 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. ',
    product_image: [] // Chứa danh sách file hình ảnh
});

const message = ref('');
const apiUrl = import.meta.env.VITE_API_URL;
async function onCreateProduct() {
    try {
        const formData = new FormData();
        formData.append('product_name', product.value.product_name);
        formData.append('product_price', product.value.product_price);
        formData.append('product_color', product.value.product_color);
        formData.append('product_description', product.value.product_description);

        for (let i = 0; i < product.value.product_image.length; i++) {
            formData.append('product_imageFiles', product.value.product_image[i]);
        }

        const response = await fetch(`${apiUrl}/v1/products`, {
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
        message.value = 'Sản phẩm được tạo thành công!';
        console.log(result);
    } catch (error) {
        console.error(error);
        message.value = 'Tạo sản phẩm thất bại.';
    }
}
</script>

<template>
    <Form class="form-container" @submit="onCreateProduct">
        <h1>Thêm mới sản phẩm</h1>
        <div class="mb-3">
            <label for="product_name" class="form-label">Tên sản phẩm:</label>
            <Field name="product_name" v-model="product.product_name" type="text" class="form-control" />
            <ErrorMessage name="product_name" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="product_price" class="form-label">Giá sản phẩm:</label>
            <Field name="product_price" v-model="product.product_price" type="number" class="form-control" />
            <ErrorMessage name="product_price" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="product_color" class="form-label">Màu sắc:</label>
            <Field name="product_color" v-model="product.product_color" type="text" class="form-control" />
            <ErrorMessage name="product_color" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="product_description" class="form-label ">Mô tả sản phẩm:</label>
            <Field name="product_description" v-model="product.product_description"
                class="form-control description-field" as="textarea" />
            <ErrorMessage name="product_description" class="error-feedback" />
        </div>

        <div class="mb-3">
            <label for="product_image" class="form-label">Hình ảnh:</label>
            <input type="file" class="form-control" multiple @change="e => product.product_image = e.target.files" />
        </div>

        <div class="mb-3">
            <button class="btn btn-primary"><i class="fas fa-save"></i> Tạo sản phẩm</button>
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
    width: 100%;
    height: 300px;
}
</style>
