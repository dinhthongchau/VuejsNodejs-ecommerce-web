<script setup>
defineProps({
    product: { type: Object, required: true },
});

// Hàm định dạng giá
const formattedPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};
</script>

<template>
    <div>
        <div v-if="typeof product.product_image === 'string'">
            <template v-if="product.product_image.startsWith('[')">
                <div class="d-flex flex-wrap">
                    <div v-for="(image, index) in JSON.parse(product.product_image)" :key="index" class="p-1"
                        style="width: 33.333%;">
                        <img class="img-fluid img-thumbnail" :src="image.replace(/\\/, '')" alt="No Image" />
                    </div>
                </div>
            </template>
            <template v-else>
                <img class="img-fluid img-thumbnail" :src="product.product_image" alt="No Image" />
            </template>
        </div>
        <div v-else-if="Array.isArray(product.product_image)">
            <div class="d-flex flex-wrap">
                <div v-for="(image, index) in product.product_image" :key="index" class="p-1" style="width: 33.333%;">
                    <img class="img-fluid img-thumbnail" :src="image" alt="No Image" />
                </div>
            </div>
        </div>

        <div class="p-1">
            <strong>Mô tả sản phẩm:</strong>
            <p>{{ product.product_description }}</p>
        </div>
        <div class="p-1">
            <strong>ID sản phẩm:</strong>
            {{ product.product_id }}
        </div>
        <div class="p-1">
            <strong>Tên sản phẩm:</strong>
            {{ product.product_name }}
        </div>
        <div class="p-1">
            <strong>Giá sản phẩm:</strong>
            {{ formattedPrice(product.product_price) }} đ
        </div>
        <div class="p-1">
            <strong>Màu sắc:</strong>
            {{ product.product_color }}
        </div>
    </div>
</template>