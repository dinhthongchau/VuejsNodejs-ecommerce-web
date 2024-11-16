<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

const product = ref({
    product_name: 'Iphone 11 64GB',
    product_price: 10000000,
    product_color: 'Trắng',
    product_description: 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. Chụp ảnh tối ưu trong điều kiện ánh sáng yếu với chế độ Ban Đêm. Xem ảnh, video và chơi game với màu sắc chân thực trên màn hình Liquid Retina 6.1 inch. Trải nghiệm hiệu năng tuyệt vời với chip A13 Bionic dành cho game, thực tế ảo tăng cường (AR) và chụp ảnh. Làm được nhiều việc hơn và sạc ít hơn với thời lượng pin bền bỉ cả ngày. Và bớt phải lo lắng nhờ khả năng chống nước ở độ sâu tối đa 2 mét trong vòng 30 phút. Tính năng nổi bật: Màn hình Liquid Retina HD LCD 6.1 inch, chống nước và chống bụi (độ sâu tối đa 2 mét trong vòng tối đa 30 phút), hệ thống camera kép 12MP với camera Ultra Wide và Wide; chế độ Ban Đêm, chế độ Chân Dung, và khả năng quay video 4K tốc độ tối đa 60 fps. Camera trước TrueDepth 12MP với chế độ Chân Dung, quay video 4K, và quay video chậm. Xác thực bảo mật với Face ID. Chip A13 Bionic với Neural Engine thế hệ thứ ba, khả năng sạc nhanh, sạc không dây. iOS 15 với các tiện ích được thiết kế lại trên Màn Hình Chính, Thư Viện Ứng Dụng hoàn toàn mới, App Clips cùng nhiều tính năng khác.',
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
