<script setup>
defineProps({
  orders: { type: Array, default: () => [] }, 
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


function formatCurrency(amount) {
    // Sử dụng toLocaleString để phân cách số theo kiểu 10.000.000
    return amount.toLocaleString('vi-VN');
}
</script>


<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-2">ID đơn hàng</th>
        <th class="col-2">ID khách hàng</th>
        <!-- <th class="col-2">Ngày đặt hàng</th> -->
        <th class="col-2">Tổng đơn hàng</th>
        <!-- <th class="col-2">Phương thức thanh toán</th> -->
        <th class="col-2">Trạng thái đơn hàng</th>
        <!-- <th class="col-4">Ghi chú đơn hàng</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, index) in orders" :key="order.order_id" :class="{ 'table-active': index === selectedIndex }"
        @click="$emit('update:selectedIndex', index)">
        <td>{{ order.order_id }}</td>
        <td>{{ order.customer_id }}</td>
        <!-- <td>{{ order.order_date }}</td> -->
        <td>{{ formatCurrency(order.order_total) }} đ</td>
        <!-- <td>{{ order.order_payment_method }}</td> -->
        <td>{{ order.order_status }}</td>
        <!-- <td>
          <div v-html="formatOrderNote(order.order_note)"></div>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>
