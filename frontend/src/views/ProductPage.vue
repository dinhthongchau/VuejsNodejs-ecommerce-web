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

// onMounted(() => {
//   if (!products.value) {
//     console.error('Product ID is undefined');
//     return;
//   }
//   // Fetch the product details using productId
//   productsService.fetchProduct(products)
//     .then((product) => {
//       console.log('Product details:', product);
//     })
//     .catch((error) => {
//       console.error('Error fetching product:', error);
//     });
// });

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
  console.log("seleted product: ",filteredProducts.value[selectedIndex.value]);
  return filteredProducts.value[selectedIndex.value];
});

async function retrieveProducts(page) {
  try {
    const chunk = await productsService.fetchProducts(page); // Đảm bảo sử dụng service đúng
    totalPages.value = chunk.metadata.lastPage ?? 1;
    products.value = chunk.products.sort(
      (current, next) => current.product_name.localeCompare(next.product_name)
    );
    selectedIndex.value = -1;
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
  router.push({ name: 'product.add' }); // Đảm bảo route đúng
}

function changeCurrentPage(page) {
  router.push({ name: 'productpage', query: { page } }); // Đảm bảo route đúng
}

watch(searchText, () => (selectedIndex.value = -1));
watch(currentPage, () => retrieveProducts(currentPage.value), { immediate: true });
watch(searchText, () => {
  console.log("Search text changed:", searchText.value); // In giá trị searchText
  selectedIndex.value = -1;
});

watch(filteredProducts, () => {
  console.log("Filtered Products:", filteredProducts.value); // Kiểm tra sản phẩm đã lọc
});

</script>

<template>
<div class="page row mb-5">
    
  <div class="mt-3 col-md-6">
    <h4>
      Danh sách Sản phẩm
      <i class="fas fa-box"></i>
    </h4>
    <div class="my-3">
      <InputSearch v-model="searchText" />
    </div>
    <ProductList
      v-if="filteredProducts.length > 0"
      :products="filteredProducts"
      v-model:selected-index="selectedIndex"
    />
    <p v-else>
      Không có sản phẩm nào.
    </p>
    <div class="mt-3 d-flex flex-wrap justify-content-round align-items-center">
      <MainPagination
        :total-pages="totalPages"
        :current-page="currentPage"
        @update:current-page="changeCurrentPage"
      />
      <div class="w-100"></div>
      <button
        class="btn btn-sm btn-primary"
        @click="retrieveProducts(currentPage)"
      >
        <i class="fas fa-redo"></i> Làm mới
      </button>
      <button
        class="btn btn-sm btn-success"
        @click="goToAddProduct"
      >
        <i class="fas fa-plus"></i> Thêm mới
      </button>
      <button
        class="btn btn-sm btn-danger"
        @click="onDeleteProducts"
      >
        <i class="fas fa-trash"></i> Xóa tất cả
      </button>
    </div>
  </div>
  <div class="mt-3 col-md-6">
    <div v-if="selectedProduct">
      <h4>
        Chi tiết Sản phẩm
        <i class="fas fa-info-circle"></i>
      </h4>
      <ProductCard :product="selectedProduct" />
      <router-link
        v-if="selectedProduct"
          :to="{
            name: 'product.edit',
            params: { product_id: selectedProduct.product_id }
          }"
        >
          <span class="mt-2 badge text-bg-warning"> <i class="fas fa-edit"></i> Hiệu chỉnh Sản phẩm</span>
        </router-link>
    </div>
  </div>
</div>
</template>



<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
