<script setup>
defineProps({
  customers: { type: Array, default: () => [] }, 
  selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);

</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID khách hàng</th>
        <th>Tên khách hàng</th>
        <!-- <th>Email</th> -->
        <th>Số điện thoại</th>
        <!-- <th>Địa chỉ</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="(customer, index) in customers" :key="customer.customer_id"
        :class="{ 'table-active': index === selectedIndex }" @click="$emit('update:selectedIndex', index)">
        <td>{{ customer.customer_id }}</td>
        <td>{{ customer.customer_name }}</td>
        <!-- <td>{{ customer.customer_email }}</td> -->
        <td>{{ customer.customer_phone }}</td>
        <!-- <td>{{ customer.customer_address }}</td> -->
      </tr>
    </tbody>
  </table>
</template>

