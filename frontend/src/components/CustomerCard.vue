<script setup>
defineProps({
    customer: { type: Object, required: true }, // Thay contact thành customer
});


</script>

<template>
    <div>

        <div class="p-1">
            <strong>ID khách hàng:</strong>
            {{ customer.customer_id }} <!-- Hiển thị ID sản phẩm -->
        </div>
        <div class="p-1">
            <strong>Tên khách hàng:</strong>
            {{ customer.customer_name }} <!-- Hiển thị tên sản phẩm -->
        </div>
        <div class="p-1">
            <strong>EMAIL:</strong>
            {{ customer.customer_email }} đ <!-- Hiển thị giá sản phẩm, có thể thêm ký hiệu tiền tệ -->
        </div>
        <div class="p-1">
            <strong>SDT:</strong>
            {{ customer.customer_phone }} <!-- Hiển thị màu sắc sản phẩm -->
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ customer.customer_address }} <!-- Hiển thị màu sắc sản phẩm -->
        </div>
    </div>
</template>
