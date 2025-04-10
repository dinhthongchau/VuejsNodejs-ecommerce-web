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
                
                <!-- Thumbnail Images -->
                <div class="thumbnail-container">
                    <div class="thumbnail-row">
                        <div v-if="typeof product.product_image === 'string'">
                            <template v-if="product.product_image.startsWith('[')">
                                <img v-for="(image, index) in JSON.parse(product.product_image)" :key="index"
                                    class="thumbnail" :class="{ 'active': currentImage === image.replace(/\\/g, '') }"
                                    :src="image.replace(/\\/g, '')" @click="currentImage = image.replace(/\\/g, '')"
                                    :alt="`Thumbnail ${index + 1}`" />
                            </template>
                            <template v-else>
                                <img class="thumbnail" :src="product.product_image.replace(/\\/g, '')"
                                    :alt="product.product_name" />
                            </template>
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

                        (Đã bao gồm VAT)
                    </p>

                </div>

                <div class="product-color">
                    <h3 class="font-weight-bold mb-2">Màu sắc: {{ product.product_color }}</h3>

                </div>
              
                <div class="promotion-container ">
                    <h4 class="font-weight-bold text-center promotion-title">Quà tặng và ưu đãi khác:</h4>
                    <ul class="list-unstyled">
                        <li>Tặng phiếu mua hàng 100,000đ mua Tai nghe AirPods (Trừ AirPods 4) (Hạn sử dụng 7 ngày)</li>
                        <li>Apple Watch giảm thêm đến 500,000đ khi mua kèm iPhone</li>
                        <li>Tặng mã giảm giá 200,000đ mua dịch vụ chọn số đẹp</li>
                        <li>Tặng phiếu mua hàng 50,000đ khi mua sim FPT kèm máy</li>
                        <li>Thu cũ đổi mới Chợ Tốt - Giảm 2.000.000đ khi thu cũ iPhone qua Chợ Tốt.</li>
                    </ul>
                </div>






    
                <div class="d-flex">
                    <button class="btn btn-primary w-50 py-3 me-2 " @click="buyNow">
                        Mua Ngay
                    </button>
                    <button class="btn btn-secondary w-50 py-3  " @click="addToCart">
                        <i class="fas fa-shopping-cart mr-2"></i>Thêm vào giỏ hàng
                    </button>
                </div>

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
import { useRouter, useRoute } from 'vue-router';
import productsService from '@/services/products.service';

const props = defineProps({
    id: { type: Number, required: true },
});

const product = ref(null);
const currentImage = ref('');
const route = useRoute();
const router = useRouter();
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
        console.log('Thông tin sản phẩm tải thành công:', product.value); // Log thông tin sản phẩm
        // Lọc tên sản phẩm
        const filteredName = product.value.product_name.replace(/\s\d+GB$/, '').trim();
        console.log('Tên sản phẩm đã lọc:', filteredName); // Log tên sản phẩm đã lọc

        // Set ảnh đầu tiên làm ảnh chính
        if (productImages.value.length > 0) {
            currentImage.value = productImages.value[0];
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
});

// Mua ngay
const buyNow = () => {
    if (product.value) {
        // Lấy dữ liệu giỏ hàng hiện tại từ localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];


        const existingItem = cart.find(item => item.product_id === product.value.product_id);

        if (existingItem) {
          
            existingItem.quantity += 1;
        } else {
        
            cart.push({ ...product.value, quantity: 1 });
        }

       
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm sản phẩm vào giỏ hàng, chuyển sang mua ngay!');

       
        router.push({ name: 'product.cart' });
    }
};


const addToCart = () => {
    if (product.value) {
        // Lấy dữ liệu giỏ hàng hiện tại từ localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];


        const existingItem = cart.find(item => item.product_id === product.value.product_id);

        if (existingItem) {
           
            existingItem.quantity += 1;
        } else {
       
            cart.push({ ...product.value, quantity: 1 });
        }

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    }
};

</script>

<style scoped>

.btn-primary {
    background-color: #ff9800;

    color: white;
    border-color: #ff9800;
}


.btn-secondary {
    background-color: white;
    /* Màu xanh */
    color: #007bff;
    border-color: #007bff;
}

.thumbnail-container {
    width: 100%;
    overflow-x: auto;
    padding: 10px 0;
}

.thumbnail-row {
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
}

.thumbnail {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid black;
    cursor: pointer;
    transition: all 0.2s ease;
    margin : 4px;
}

.thumbnail:hover {
    border-color: #3b82f6;
}

.thumbnail.active {
    border-color: #3b82f6;
}

.thumbnail-container {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
}

.thumbnail-container::-webkit-scrollbar {
    height: 6px;
}

.thumbnail-container::-webkit-scrollbar-track {
    background: transparent;
}

.thumbnail-container::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
}
.promotion-container {
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
}

.promotion-title {
    background-color: red;
    color: yellow;
    padding: 10px;
    border-radius: 0.25rem;
  
}

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