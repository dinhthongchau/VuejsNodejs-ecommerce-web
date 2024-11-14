<script setup>
defineProps({
  customers: { type: Array, default: () => [] }, // Thay contacts thành customers
  selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);

</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item px-3"
      v-for="(customer, index) in customers" 
      :class="{ active: index === selectedIndex }"
      :key="customer.id"
      @click="$emit('update:selectedIndex', index)"
    >ID: {{ customer.customer_id }} Tên KH:
      {{ customer.customer_name }} <!-- Hiển thị tên sản phẩm -->
    </li>
  </ul>
</template>
