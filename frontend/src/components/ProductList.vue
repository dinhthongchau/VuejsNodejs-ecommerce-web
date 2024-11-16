<!-- ProductTable.vue -->
<script setup>
defineProps({
  products: { type: Array, default: () => [] },
  selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-2">ID sản phẩm</th>
        <th class="col-3">Tên sản phẩm</th>
        <th class="col-2">Giá sản phẩm</th>
        <th class="col-2">Màu sắc</th>
        <!-- <th class="col-3">Mô tả sản phẩm</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product.product_id"
        :class="{ 'table-active': index === selectedIndex }" @click="$emit('update:selectedIndex', index)">
        <td>{{ product.product_id }}</td>
        <td>{{ product.product_name }}</td>
        <td>{{ product.product_price }} đ</td>
        <td>{{ product.product_color }}</td>
        <!-- <td>{{ product.product_description }}</td> -->
      </tr>
    </tbody>
  </table>
</template>

<style>
.table {
  width: 100%;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
  /* Màu nền cho hàng lẻ */
}

.table-active {
  background-color: #cce5ff;
  /* Màu khi dòng được chọn */
}

.col-2,
.col-3 {
  width: auto;
  /* Cân chỉnh độ rộng các cột */
}
</style>
