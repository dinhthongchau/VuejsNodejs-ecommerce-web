<template>
    <div class="page">
        <!-- Logo -->
        <div class="text-center my-3">
            <img src="@/image-shop/logo.png" alt="Logo" class="logo" />
        </div>

        <!-- Slider -->
        <div class="slider">
            <div class="slider-images">
                <img v-for="(image, index) in sliderImages" :key="index" :src="image" alt="Slider Image" />
            </div>
            <div class="slider-controls">
                <button @click="prevImage">❮</button>
                <button @click="nextImage">❯</button>
            </div>
            <div class="slider-indicators">
                <span v-for="(image, index) in sliderImages" :key="index" class="dot"
                    :class="{ active: currentIndex === index }"></span>
            </div>
        </div>

        <!-- Bộ lọc sản phẩm -->
        <div class="filter">
            <div class="filter-options">
                <button @click="filterAll">Tất cả</button>
                <button @click="filterIPhone('16')">iPhone 16</button>
                <button @click="filterIPhone('15')">iPhone 15</button>
                <button @click="filterIPhone('14')">iPhone 14</button>
                <button @click="filterIPhone('13')">iPhone 13</button>
                <button @click="filterIPhone('12')">iPhone 12</button>
                <button @click="filterIPhone('11')">iPhone 11</button>
            </div>
            <div class="sort-options">
                <button @click="sortLowToHigh">Xếp theo: Giá thấp đến cao</button>
                <button @click="sortHighToLow">Giá cao đến thấp</button>
            </div>
        </div>

        <!-- Danh sách sản phẩm -->
        <div class="product-list">
            <div v-for="product in filteredProducts" :key="product.product_id" class="product-card"
                style="flex: 0 0 calc(33.333% - 20px); margin: 10px; " @click="goToProductDetail(product.product_id)">
                <!-- click-->

                <!-- image -->
                <div v-if="typeof product.product_image === 'string'">
                    <template v-if="product.product_image.startsWith('[')">
                        <div class="p-1 w-75 h-75">
                            <img class="img-fluid img-thumbnail"
                                :src="JSON.parse(product.product_image)[0].replace(/\\/, '')" alt="No Image" />
                        </div>
                    </template>
                    <template v-else>
                        <img class="img-fluid img-thumbnail" :src="product.product_image" alt="No Image" />
                    </template>
                </div>
                <div v-else-if="Array.isArray(product.product_image)">
                    <div class="p-1 w-75 h-75">
                        <img class="img-fluid img-thumbnail" :src="product.product_image[0]" alt="No Image" />
                    </div>
                </div>
                <!-- Name and price -->
                <h5>{{ product.product_name }}</h5>
                <p>{{ product.product_price }} đ</p>


            </div>
            <div>
                <MainPagination :total-pages="totalPages" :current-page="currentPage"
                    @update:current-page="changeCurrentPage" />

            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import ProductList from '@/components/ProductList.vue';
import MainPagination from '@/components/MainPagination.vue';
import productsService from '@/services/products.service'; 

const router = useRouter();
const route = useRoute();
const totalPages = ref(1);
const currentPage = computed(() => {
    const page = Number(route.query?.page);
    if (Number.isNaN(page) || page < 1) return 1;
    return page;
});
const products = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');

const searchableProducts = computed(() =>
    products.value.map((product) => {
        const { product_name, product_description } = product;
        return [product_name, product_description].join('');
    })
);

const filteredProducts = computed(() => {
    if (!searchText.value) return products.value;
    return products.value.filter((product, index) =>
        searchableProducts.value[index].includes(searchText.value)
    );
});

const selectedProduct = computed(() => {
    if (selectedIndex.value < 0) return null;
    return filteredProducts.value[selectedIndex.value];
});

async function retrieveProducts(page) {
    try {
        const chunk = await productsService.fetchProducts(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        products.value = chunk.products.sort(
            (current, next) => current.product_name.localeCompare(next.product_name)
        );
        // Giới hạn số sản phẩm hiển thị 
        const limit = 9; 
        products.value = products.value.slice(0, limit); // Lấy 9 sản phẩm đầu tiên

        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
    console.log(filteredProducts.value);
}

async function onDeleteProducts() {
    if (confirm('Bạn muốn xóa tất cả Sản phẩm?')) {
        try {
            await productsService.deleteAllProducts();
            totalPages.value = 1;
            products.value = [];
            selectedIndex.value = -1;
            changeCurrentPage(1);
        } catch (error) {
            console.log(error);
        }
    }
}

function goToAddProduct() {
    router.push({ name: 'product.add' }); 
}

function changeCurrentPage(page) {
    router.push({ name: 'iphoneview', query: { page } }); 
}
const sliderImages = ref([
    '@/image-shop/logo.png',
    '@/image-shop/logo.png',
    '@/image-shop/logo.png'
]);
const currentIndex = ref(0);

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + sliderImages.value.length) % sliderImages.value.length;
};

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % sliderImages.value.length;
};


const filterAll = () => {
    // Logic để lọc tất cả sản phẩm
};

const filterIPhone = (version) => {
    // Logic để lọc sản phẩm theo phiên bản iPhone
};

const sortLowToHigh = () => {
    // Logic để sắp xếp sản phẩm từ thấp đến cao
};

const sortHighToLow = () => {
    // Logic để sắp xếp sản phẩm từ cao đến thấp
};

function goToProductDetail(productId) {
    router.push({ name: 'product.detail', params: { id: productId } }); // Đảm bảo route detail có định nghĩa phù hợp
}

watch(searchText, () => (selectedIndex.value = -1));
watch(currentPage, () => retrieveProducts(currentPage.value), { immediate: true });
</script>


<style scoped>
.page {
    text-align: center;
}

.logo {
    max-width: 200px;
    /* Điều chỉnh kích thước logo */
}

.slider {
    position: relative;
}

.slider-images img {
    width: 100%;
    border-radius: 8px;
}

.slider-controls button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.slider-controls button:first-child {
    left: 10px;
}

.slider-controls button:last-child {
    right: 10px;
}

.slider-indicators {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.dot {
    height: 10px;
    width: 10px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}

.dot.active {
    background-color: #717171;
}

.filter {
    margin: 20px 0;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.product-card {
    margin: 10px;
    transition: all 0.3s;
}

.product-card:hover {
    background-color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
