<script setup>
defineProps({
  orders: { type: Array, default: () => [] }, // Thay contacts thành orders
  selectedIndex: { type: Number, default: -1 },
});
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('vi-VN', options);
}
// Thêm hàm để xử lý order note
function formatOrderNote(note) {
  if (!note) return '';
  // Tách chuỗi theo dấu phẩy và loại bỏ khoảng trắng thừa
  const items = note.split(',').map(item => item.trim());
  // Nối các phần tử lại với thẻ <br>
  return items.join('<br>');
}

const $emit = defineEmits(['update:selectedIndex']);

</script>

<template>
  <ul class="list-group">
    <li class="list-group-item px-3" v-for="(order, index) in orders" :class="{ active: index === selectedIndex }"
      :key="order.id" @click="$emit('update:selectedIndex', index)">
      <div><strong>ID:</strong> {{ order.order_id }}</div>
      <div><strong>TIME:</strong> {{ formatDate(order.order_date) }}</div>
      <div>
        <strong>ITEMS:</strong>
        <div v-html="formatOrderNote(order.order_note)" class="ml-2"></div>
      </div>
    </li>
  </ul>
</template>
