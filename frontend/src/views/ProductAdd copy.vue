<script setup>
import { ref } from 'vue';

const product = ref({
    product_name: 'SP TEST 1 hinh ,,1 ',
    product_price: 100,
    product_color: 'string',
    product_description: 'string',
    product_image: [] // Chứa danh sách file hình ảnh
});

const message = ref('');

async function onCreateProduct() {
    try {
        const formData = new FormData();
        formData.append('product_name', product.value.product_name);
        formData.append('product_price', product.value.product_price);
        formData.append('product_color', product.value.product_color);
        formData.append('product_description', product.value.product_description);

        // Sửa lại: Đổi tên từ 'product_image' thành 'product_imageFiles'
        for (let i = 0; i < product.value.product_image.length; i++) {
            formData.append('product_imageFiles', product.value.product_image[i]);
        }

        const response = await fetch('http://localhost:3300/api/v1/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        });

        // Log FormData để debug
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

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
    <div class="page">
        <h4>Thêm mới sản phẩm</h4>
        <form @submit.prevent="onCreateProduct">
            <div>
                <label for="product_name">Tên sản phẩm:</label>
                <input v-model="product.product_name" type="text" id="product_name" />
            </div>
            <div>
                <label for="product_price">Giá sản phẩm:</label>
                <input v-model="product.product_price" type="number" id="product_price" />
            </div>
            <div>
                <label for="product_color">Màu sắc:</label>
                <input v-model="product.product_color" type="text" id="product_color" />
            </div>
            <div>
                <label for="product_description">Mô tả sản phẩm:</label>
                <textarea v-model="product.product_description" id="product_description"></textarea>
            </div>
            <div>
                <label for="product_image">Hình ảnh:</label>
                <input type="file" multiple @change="e => product.product_image = e.target.files" />
            </div>
            <button type="submit">Tạo sản phẩm</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>