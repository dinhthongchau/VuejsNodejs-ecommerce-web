<script setup>
defineProps({
  products: { type: Array, default: () => [] }, // Thay contacts thành products
  selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);

</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item px-3"
      v-for="(product, index) in products" 
      :class="{ active: index === selectedIndex }"
      :key="product.id"
      @click="$emit('update:selectedIndex', index)"
    >ID: {{ product.product_id }} Tên SP:
      {{ product.product_name }} <!-- Hiển thị tên sản phẩm -->
    </li>
  </ul>
</template>
