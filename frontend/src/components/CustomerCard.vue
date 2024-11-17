<script setup>
defineProps({
    customer: { type: Object, required: true }, 
});


</script>

<template>
    <div>

        <div class="p-1">
            <strong>ID khách hàng:</strong>
            {{ customer.customer_id }} 
        </div>
        <div class="p-1">
            <strong>Tên khách hàng:</strong>
            {{ customer.customer_name }}
        </div>
        <div class="p-1">
            <strong>EMAIL:</strong>
            {{ customer.customer_email }} đ 
        </div>
        <div class="p-1">
            <strong>SDT:</strong>
            {{ customer.customer_phone }} 
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ customer.customer_address }} 
        </div>
    </div>
</template>
