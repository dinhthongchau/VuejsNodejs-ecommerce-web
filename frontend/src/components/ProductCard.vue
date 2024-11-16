<script setup>
defineProps({
    product: { type: Object, required: true }, // Thay contact thành product
});


</script>

<template>
    <div>
    
        <div v-if="typeof product.product_image === 'string'">
            <template v-if="product.product_image.startsWith('[')">
                <div v-for="(image, index) in JSON.parse(product.product_image)" :key="index" class="p-1 w-75 h-75">
                    <img class="img-fluid img-thumbnail" :src="image.replace(/\\/, '')" alt="No Image" />
                </div>
            </template>
            <template v-else>
                <img class="img-fluid img-thumbnail" :src="product.product_image" alt="No Image" />
            </template>
        </div>
        <div v-else-if="Array.isArray(product.product_image)">
            <div v-for="(image, index) in product.product_image" :key="index" class="p-1 w-75 h-75">
                <img class="img-fluid img-thumbnail" :src="image" alt="No Image" />
            </div>
        </div>


        <div class="p-1">
            <strong>Mô tả sản phẩm:</strong>
            <p>{{ product.product_description }}</p> <!-- Hiển thị mô tả sản phẩm -->
        </div>
        <div class="p-1">
            <strong>ID sản phẩm:</strong>
            {{ product.product_id }} <!-- Hiển thị ID sản phẩm -->
        </div>
        <div class="p-1">
            <strong>Tên sản phẩm:</strong>
            {{ product.product_name }} <!-- Hiển thị tên sản phẩm -->
        </div>
        <div class="p-1">
            <strong>Giá sản phẩm:</strong>
            {{ product.product_price }} đ <!-- Hiển thị giá sản phẩm, có thể thêm ký hiệu tiền tệ -->
        </div>
        <div class="p-1">
            <strong>Màu sắc:</strong>
            {{ product.product_color }} <!-- Hiển thị màu sắc sản phẩm -->
        </div>
    </div>
</template>
