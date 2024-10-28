<template>
    <div class="product-detail container mx-auto">
        <div v-if="product" class="d-flex gap-4">
            <!-- Left side - Image Gallery -->
            <div class="col-6">
                <div class="main-image position-relative">
                    <img class="img-fluid rounded shadow" :src="currentImage" alt="Main Product Image" />
                    <div class="arrow left" @click="prevImage">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="arrow right" @click="nextImage">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <!-- <div class="thumbnail-images d-flex gap-2 mt-4">
                    <div v-for="(image, index) in productImages" :key="index" class="thumbnail-wrapper cursor-pointer"
                        :class="{ 'border-primary': currentImage === image }" @click="currentImage = image">
                        <img class="img-thumbnail w-25 h-25" :src="image.replace(/\\/g, '')" alt="Thumbnail" />
                    </div>
                </div> -->
                <!-- Thumbnail Images -->
                <div class="thumbnail-images d-flex gap-2 mt-4 flex-wrap">
    <div v-if="typeof product.product_image === 'string'">
        <template v-if="product.product_image.startsWith('[')">
            <div v-for="(image, index) in JSON.parse(product.product_image)" :key="index"
                class="thumbnail-wrapper cursor-pointer"
                :class="{ 'border-primary': currentImage === image.replace(/\\/g, '') }"
                @click="currentImage = image.replace(/\\/g, '')">
                <img class="img-thumbnail w-25 h-25" :src="image.replace(/\\/g, '')" alt="Thumbnail" />
            </div>
        </template>
        <template v-else>
            <img class="img-thumbnail w-25 h-25" :src="product.product_image.replace(/\\/g, '')"
                alt="Thumbnail" />
        </template>
    </div>
    <div v-else-if="Array.isArray(product.product_image)">
        <div v-for="(image, index) in product.product_image" :key="index"
            class="thumbnail-wrapper cursor-pointer"
            :class="{ 'border-primary': currentImage === image }" @click="currentImage = image">
            <img class="img-thumbnail w-25 h-25" :src="image.replace(/\\/g, '')" alt="Thumbnail" />
        </div>
    </div>
</div>


            </div>

            <!-- Right side - Product Information -->
            <div class="col-6">
                <div class="product-header mb-4">
                    <h1 class="h3 font-weight-bold">{{ product.product_name }}</h1>
                    <p class="h4 font-weight-bold text-danger">
                        {{ formatPrice(product.product_price) }} đ
                    </p>
                </div>

                <div class="product-location">
                    <p class="text-secondary">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        Giá và khuyến mãi tại: Hồ Chí Minh
                    </p>

                </div>

                <div class="product-color">
                    <h3 class="font-weight-bold mb-2">Màu sắc:</h3>
                    <p class="d-flex align-items-center gap-2">
                        <span class="rounded-circle"
                            :style="{ backgroundColor: product.product_color, width: '0px', height: '50px' }"></span>
                        {{ product.product_color }}
                    </p>
                </div>



                <button class="btn btn-primary w-100 py-3">
                    <i class="fas fa-shopping-cart mr-2"></i>
                    Mua Ngay
                </button>

                <div class="product-info mt-4">
                    <p>
                        <i class="fas fa-sync-alt mr-2"></i>
                        Hư gì đổi nấy 12 tháng tại 3053 siêu thị trên toàn quốc
                        <a href="#" class="text-primary">Xem chi tiết</a>
                    </p>
                    <p>
                        <i class="fas fa-truck mr-2"></i>
                        Giao hàng nhanh toàn quốc
                        <a href="#" class="text-primary">Xem chi tiết</a>
                    </p>
                    <p>
                        <i class="fas fa-phone-alt mr-2"></i>
                        Tổng đài: <strong>1900.9696.42 (8:00 - 21:30)</strong>
                    </p>
                </div>

            </div>

        </div>
        <div v-if="product" class="product-description">
            <h3 class="font-weight-bold mb-2">Mô tả sản phẩm:</h3>
            <p class="text-secondary">{{ product.product_description }}</p>
        </div>

        <div v-else class="d-flex justify-content-center align-items-center h-64">
            <div class="text-center">
                <i class="fas fa-spinner fa-spin text-primary mb-4" style="font-size: 3rem;"></i>
                <p>Đang tải thông tin sản phẩm...</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import productsService from '@/services/products.service';

const props = defineProps({
    id: { type: Number, required: true },
});

const product = ref(null);
const currentImage = ref('');
const route = useRoute();

// Xử lý danh sách hình ảnh
const productImages = computed(() => {
    if (!product.value) return [];

    if (typeof product.value.product_image === 'string') {
        if (product.value.product_image.startsWith('[')) {
            return JSON.parse(product.value.product_image).map(image =>
                image.replace(/\\/g, '')
            );
        }
        return [product.value.product_image];
    }

    if (Array.isArray(product.value.product_image)) {
        return product.value.product_image;
    }

    return [];
});

// Điều hướng hình ảnh
const currentImageIndex = computed(() =>
    productImages.value.indexOf(currentImage.value)
);

const nextImage = () => {
    const nextIndex = (currentImageIndex.value + 1) % productImages.value.length;
    currentImage.value = productImages.value[nextIndex];
};

const prevImage = () => {
    const prevIndex = currentImageIndex.value <= 0
        ? productImages.value.length - 1
        : currentImageIndex.value - 1;
    currentImage.value = productImages.value[prevIndex];
};

// Format giá
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};

onMounted(async () => {
    try {
        const id = route.params.id;
        product.value = await productsService.fetchProduct(id);

        // Set ảnh đầu tiên làm ảnh chính
        if (productImages.value.length > 0) {
            currentImage.value = productImages.value[0];
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
});
</script>

<style scoped>
.thumbnail-wrapper {
    border: 2px solid transparent;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: all 0.2s;
}

.thumbnail-wrapper:hover {
    border-color: #3b82f6;
}

.main-image {
    aspect-ratio: 1;
}

.main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
}

.arrow:hover {
    background: rgba(0, 0, 0, 0.7);
}

.arrow.left {
    left: 10px;
}

.arrow.right {
    right: 10px;
}
</style>