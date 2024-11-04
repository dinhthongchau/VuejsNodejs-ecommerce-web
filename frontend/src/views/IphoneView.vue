<template>
    <div class="page">
        <!-- Logo -->
        <div class="text-center my-3">
            <img src="@/image-shop/iphone.png" alt="Logo" class="logo" />
        </div>

        <!-- Slider -->
        <div class="slider">
            <div class="slider-images">
                <img :src="sliderImages[currentIndex]" alt="Slider Image" />
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


        <div class="filter-cate">
            <div class="ft-cate">
                <button :class="{ active: selectedFilter === 'all' }" @click="filterAll">Tất cả</button>
                <button :class="{ active: selectedFilter === '16' }" @click="filterIPhone('16')">Iphone 16</button>
                <button :class="{ active: selectedFilter === '15' }" @click="filterIPhone('15')">Iphone 15</button>
                <button :class="{ active: selectedFilter === '14' }" @click="filterIPhone('14')">Iphone 14</button>
                <button :class="{ active: selectedFilter === '13' }" @click="filterIPhone('13')">Iphone 13</button>
                <button :class="{ active: selectedFilter === '12' }" @click="filterIPhone('12')">Iphone 12</button>
                <button :class="{ active: selectedFilter === '11' }" @click="filterIPhone('11')">Iphone 11</button>
            </div>

            <div class="sort-options">
                <button @click="sortLowToHigh">Giá thấp đến cao</button>
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
                <h6>{{ "Màu: " + product.product_color }}</h6>
                <p>{{ formatCurrency(product.product_price) }}</p>


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
const filteredProducts = ref([]); // Dùng ref thay vì computed
function updateFilteredProducts() {
    if (!searchText.value) {
        filteredProducts.value = products.value;
    } else {
        filteredProducts.value = products.value.filter((product, index) =>
            searchableProducts.value[index].includes(searchText.value)
        );
    }
}

const selectedProduct = computed(() => {
    if (selectedIndex.value < 0) return null;
    return filteredProducts.value[selectedIndex.value];
});

// async function retrieveProducts() {
//     try {
//         let page = 1;
//         let allProducts = [];
//         let hasNextPage = true;

//         while (hasNextPage) {
//             const chunk = await productsService.fetchProducts(page);
//             allProducts = [...allProducts, ...chunk.products];
//             hasNextPage = page < (chunk.metadata.lastPage ?? 1);
//             page++;
//         }

//         totalPages.value = 1; // Không cần phân trang trong bộ lọc này
//         products.value = allProducts.sort((current, next) =>
//             current.product_name.localeCompare(next.product_name)
//         );
//         selectedIndex.value = -1;
//         updateFilteredProducts(); // Cập nhật filteredProducts
//     } catch (error) {
//         console.log(error);
//     }
// }
async function retrieveProducts (){
    try {
        const search = route.query.search || '';
        let page = 1;
        let allProducts = [];
        let hasNextPage = true;

        while (hasNextPage) {
            const chunk = await productsService.fetchProducts(page);
            allProducts = [...allProducts, ...chunk.products];
            hasNextPage = page < (chunk.metadata.lastPage ?? 1);
            page++;
        }

        // Lọc sản phẩm theo truy vấn tìm kiếm
        if (search) {
            allProducts = allProducts.filter(product =>
                product.product_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        totalPages.value = 1; // Không cần phân trang trong bộ lọc này
        products.value = allProducts.sort((current, next) =>
            current.product_name.localeCompare(next.product_name)
        );
        selectedIndex.value = -1;
        updateFilteredProducts(); // Cập nhật filteredProducts
    } catch (error) {
        console.log(error);
    }
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
    '/src/image-shop/slider1.png', // đường dẫn tương đối đến thư mục
    '/src/image-shop/slider2.png',
    '/src/image-shop/slider3.png'
]);


const currentIndex = ref(0);

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + sliderImages.value.length) % sliderImages.value.length;
};

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % sliderImages.value.length;
};

const selectedFilter = ref('all'); // Mặc định là 'Tất cả'

// Cập nhật hàm filter để thiết lập nút đang được chọn
const filterAll = () => {
    filteredProducts.value = products.value;
    selectedFilter.value = 'all';
};

const filterIPhone = (version) => {
    filteredProducts.value = products.value.filter(product => product.product_name.includes(`Iphone ${version}`));
    selectedFilter.value = version; // Lưu phiên bản được chọn
};

// const filterAll = () => {
//     filteredProducts.value = products.value;
// };

// // Sử dụng hàm lọc theo phiên bản Iphone
// const filterIPhone = (version) => {
//     filteredProducts.value = products.value.filter(product => product.product_name.includes(`Iphone ${version}`));
// };

const sortLowToHigh = () => {
    // Logic để sắp xếp sản phẩm từ thấp đến cao
    filteredProducts.value.sort((a, b) => a.product_price - b.product_price);
};

const sortHighToLow = () => {
    // Logic để sắp xếp sản phẩm từ cao đến thấp
    filteredProducts.value.sort((a, b) => b.product_price - a.product_price);
};

function goToProductDetail(productId) {
    router.push({ name: 'product.detail', params: { id: productId } }); // Đảm bảo route detail có định nghĩa phù hợp
}
function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
}
onMounted(() => {
    retrieveProducts();
});
// Theo dõi thay đổi trong query
watch(() => route.query.search, (newValue) => {
    retrieveProducts(); // Gọi lại hàm khi có thay đổi
});
watch(searchText, () => (selectedIndex.value = -1));
watch(currentPage, () => retrieveProducts(), { immediate: true });
watch([products, searchText], updateFilteredProducts, { immediate: true });
</script>


<style scoped>
.page {
    text-align: center;
    max-width: 900px;
    /* Chiều rộng tùy chỉnh */
    margin: 0 auto;
    
}
body{
    background-color: #3e3e3f;
    /* Màu nền cho toàn bộ trang */}
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

.product-card img {
    max-width: 150px;
    height: 150px;

}

/* .product-card {
    border-radius: 10px;
    margin: 10px;
    transition: all 0.3s;
} */
.product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin: 10px;
    transition: all 0.3s;
    border: 2px solid #C0C0C0;
    /* Viền màu cam đậm */
    border-radius: 10px;
}

.product-card:hover {

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.filter-cate {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
}

.ft-cate {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* Để căn giữa các nút */
    width: 100%;
}

.ft-cate button {
    margin: 5px;
    /* Khoảng cách giữa các nút */
    padding: 10px 15px;
    /* Định dạng nút */
    border: 2px solid #396ce8;
    /* Đường viền màu xanh */
    border-radius: 5px;
    /* Bo góc */
    background-color: transparent;
    /* Không có màu nền */
    color: #396ce8;
    /* Màu chữ */
    cursor: pointer;
    /* Con trỏ khi di chuột */
    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
    /* Hiệu ứng chuyển màu */
}

.ft-cate button:hover {
    background-color: #396ce8;
    /* Màu nền khi hover */
    color: white;
    /* Màu chữ khi hover */
}

.sort-options {
    margin-top: 15px;
    /* Khoảng cách phía trên */
}

.sort-options button {
    margin: 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #bbb;
    
    color: #fff;
   
    cursor: pointer;
  
    transition: background-color 300ms ease-in-out;
    /* Hiệu ứng chuyển màu thay thế cho var(--transition) */
}

.sort-options button:hover {
    background-color: black;
    /* Màu khi hover */
}

.slider-images img {
    width: 1200;
    /* Chiều rộng 100% của phần tử cha */
    height: 300;
    /* Tự động điều chỉnh chiều cao để giữ tỉ lệ */
    max-height: 400px;
    /* Giới hạn chiều cao tối đa */
    border-radius: 8px;
}
.ft-cate button.active {
    background-color: #396ce8;
    /* Màu nền khi nút đang được chọn */
    color: white;
    /* Màu chữ */
}
</style>
