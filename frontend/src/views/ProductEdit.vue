<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProductForm from '@/components/ProductForm.vue';
import productsService from '@/services/products.service';
const props = defineProps({
  productId: { type: String, required: true }
});
const router = useRouter();
const route = useRoute();
const product = ref(null);
const message = ref('');

const productId = route.params.product_id; 

onMounted(() => {
  if (!productId) {
    console.error('Product ID is undefined');
    return;
  }
  // Fetch the product details using productId
  productsService.fetchProduct(productId) // Sử dụng productId
    .then((product) => {
      console.log('Product details:', product);
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
    });
});

async function getProduct(product_id) {
  try {
    product.value = await productsService.fetchProduct(product_id);
  } catch (error) {
    console.log(error);
    router.push({
      name: 'notfound',
      params: { pathMatch: route.path.split('/').slice(1) },
      query: route.query,
      hash: route.hash
    });
  }
}
async function onUpdateProduct(product) {
  try {
    await productsService.updateProduct(props.productId, product);
    message.value = 'Liên hệ được cập nhật thành công.';
  } catch (error) {
    console.log(error);
    message.value = 'Lỗi cập nhật Liên hệ.';
  }
}
async function onDeleteProduct(product_id) {
  if (confirm('Bạn muốn xóa Liên hệ này?')) {
    try {
      await productsService.deleteProduct(product_id);
      router.push({ name: 'productpage' });
    } catch (error) {
      console.log(error);
    }
  }
}
getProduct(props.productId);
</script>
<template>
  <div v-if="product" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ProductForm
      :product="product"
      @submit:product="onUpdateProduct"
      @delete:product="onDeleteProduct"
    />
    <p>{{ message }}</p>
  </div>
</template>