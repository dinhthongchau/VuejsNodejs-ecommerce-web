<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

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
const filteredProducts = ref([]);
function updateFilteredProducts() {
  if (!searchText.value) {
    filteredProducts.value = products.value;
  } else {
    filteredProducts.value = products.value.filter((product, index) =>
      searchableProducts.value[index].includes(searchText.value)
    );
  }
}




async function retrieveProducts() {
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

    if (search) {
      allProducts = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    totalPages.value = 1;
    products.value = allProducts.sort((current, next) =>
      current.product_name.localeCompare(next.product_name)
    );
    selectedIndex.value = -1;
    updateFilteredProducts();
  } catch (error) {
    console.log(error);
  }
}



function changeCurrentPage(page) {
  router.push({ name: 'iphoneview', query: { page } });
}
const sliderImages = ref([
  'https://cdnv2.tgdd.vn/mwg-static/topzone/Banner/39/05/39050ec4293c942a953b00ada7c5bb67.png',
  'https://cdnv2.tgdd.vn/mwg-static/topzone/Banner/8d/a6/8da6a304fdc158ed931d1c8b24f85677.png',
  'https://www.topzone.vn/iphone/iphone-13?itm_source=trang-nganh-hang&itm_medium=banner'
]);

const currentIndex = ref(0);

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + sliderImages.value.length) % sliderImages.value.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % sliderImages.value.length;
};

const selectedFilter = ref('all');
const filterAll = () => {
  filteredProducts.value = products.value;
  selectedFilter.value = 'all';
};


const filterIPhone = (version) => {
  if (products.value.length === 0) {
    console.log('No products available to filter');
    return;
  }

  filteredProducts.value = products.value.filter((product) =>
    product.product_name.toLowerCase().includes(`iphone ${version}`)
  );
  selectedFilter.value = version;
};



const sortLowToHigh = () => {

  filteredProducts.value.sort((a, b) => a.product_price - b.product_price);
};

const sortHighToLow = () => {
 
  filteredProducts.value.sort((a, b) => b.product_price - a.product_price);
};

function goToProductDetail(productId) {
  router.push({ name: 'product.detail', params: { id: productId } });
}
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
}
onMounted(() => {
  retrieveProducts();
});

watch(
  () => route.query.search,
  (newValue) => {
    retrieveProducts();
  }
);
watch(searchText, () => (selectedIndex.value = -1));
watch(currentPage, () => retrieveProducts(), { immediate: true });
watch([products, searchText], updateFilteredProducts, { immediate: true });
</script>


<template>
  <div class="page">
    <!-- Logo -->
    <div class="text-center my-3">
      <img src="@/assets/image-shop/iphone.png" alt="Logo" class="logo" />
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
        <button :class="{ active: selectedFilter === 'all' }" @click="filterAll">
          Tất cả
        </button>
        <button :class="{ active: selectedFilter === '16' }" @click="filterIPhone('16')">
          Iphone 16
        </button>
        <button :class="{ active: selectedFilter === '15' }" @click="filterIPhone('15')">
          Iphone 15
        </button>
        <button :class="{ active: selectedFilter === '14' }" @click="filterIPhone('14')">
          Iphone 14
        </button>
        <button :class="{ active: selectedFilter === '13' }" @click="filterIPhone('13')">
          Iphone 13
        </button>
        <button :class="{ active: selectedFilter === '12' }" @click="filterIPhone('12')">
          Iphone 12
        </button>
        <button :class="{ active: selectedFilter === '11' }" @click="filterIPhone('11')">
          Iphone 11
        </button>
      </div>

      <div class="sort-options">
        <button @click="sortLowToHigh">Giá thấp đến cao</button>
        <button @click="sortHighToLow">Giá cao đến thấp</button>
      </div>
    </div>

    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.product_id" class="product-card"
        style="flex: 0 0 calc(33.333% - 20px); margin: 10px" @click="goToProductDetail(product.product_id)">

        <div v-if="typeof product.product_image === 'string'">
          <template v-if="product.product_image.startsWith('[')">
            <div class="p-1 w-75 h-75">
              <img v-lazy="JSON.parse(product.product_image)[0]" alt="No Image" class="img-fluid img-thumbnail"
                @load="console.log('Image loaded:', JSON.parse(product.product_image)[0])" />
            </div>
          </template>
          <template v-else>
            <img v-lazy="product.product_image" alt="No Image" class="img-fluid img-thumbnail" />
          </template>
        </div>
        <div v-else-if="Array.isArray(product.product_image)">
          <div class="p-1 w-75 h-75">
            <img v-lazy="product.product_image[0]" alt="No Image" class="img-fluid img-thumbnail" />
          </div>
        </div>

        <!-- Name and price -->
        <h5>{{ product.product_name }}</h5>
        <h6>{{ 'Màu: ' + product.product_color }}</h6>
        <p>{{ formatCurrency(product.product_price) }}</p>
      </div>

    </div>
    <div class="pagination-wrapper">
      <MainPagination :total-pages="totalPages" :current-page="currentPage" @update:current-page="changeCurrentPage" />
    </div>
  </div>
</template>


<style scoped>
.page {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;

}


body {
  background-color: #3e3e3f;

}

.logo {
  max-width: 200px;

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



.product-card img {
  max-width: 150px;
  height: 150px;
}


.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 10px;
  transition: all 0.3s;
  border: 2px solid #c0c0c0;
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
  width: 100%;
}

.ft-cate button {
  margin: 5px;
  padding: 10px 15px;
  border: 2px solid #396ce8;
  border-radius: 5px;
  background-color: transparent;
  color: #396ce8;
  cursor: pointer;
  transition:
    background-color 300ms ease-in-out,
    color 300ms ease-in-out;
}

.ft-cate button:hover {
  background-color: #396ce8;
  color: white;
}

.sort-options {
  margin-top: 15px;
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

}

.sort-options button:hover {
  background-color: black;

}

.slider-images img {
  width: 1200;
  height: 300;
  max-height: 400px;
  border-radius: 8px;
}

.ft-cate button.active {
  background-color: #396ce8;
  color: white;
}
</style>
