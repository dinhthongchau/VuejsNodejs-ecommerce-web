<script setup>
defineProps({
  product: { type: Object, required: true }, // Thay contact thành product
});
</script>

<template>
  <div>
    <div class="p-1 w-75 h-75">
      <img class="img-fluid img-thumbnail" :src="product.product_image" alt="No Image" />
    </div>
    <div class="p-1">
      <strong>Toàn văn:</strong>
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
