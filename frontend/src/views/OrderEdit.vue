<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import OrderForm from '@/components/OrderForm.vue';
import ordersService from '@/services/orders.service';
const props = defineProps({
    orderId: { type: String, required: true }
});
const router = useRouter();
const route = useRoute();
const order = ref(null);
const message = ref('');

const orderId = route.params.order_id;
console.log('Order ID here:', orderId);

onMounted(() => {
    if (!orderId) {
        console.error('Order ID is undefined');
        return;
    }
    // Fetch the order details using orderId
    ordersService.fetchOrder(orderId) // Sử dụng orderId
        .then((order) => {
            console.log('Order details:', order);
        })
        .catch((error) => {
            console.error('Error fetching order:', error);
        });
});

async function getOrder(order_id) {
    try {
        console.log("order_id có được truyền không:", order_id);
        console.log("lỗi ở đây");
        order.value = await ordersService.fetchOrder(order_id);
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
async function onUpdateOrder(order) {
    try {
        await ordersService.updateOrder(orderId, order);
        message.value = 'Liên hệ được cập nhật thành công.';
    } catch (error) {
        console.log(error);
        message.value = 'Lỗi cập nhật Liên hệ.';
    }
}
// async function onUpdateOrder(formData) {
//   try {
//     await ordersService.updateOrder(orderId, formData); // Truyền orderId và formData đúng
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

async function onDeleteOrder(order_id) {
    if (confirm('Bạn muốn xóa Liên hệ này?')) {
        try {
            await ordersService.deleteOrder(order_id);
            router.push({ name: 'orderpage' });
        } catch (error) {
            console.log(error);
        }
    }
}
getOrder(orderId);
//getOrder(route.params.order_id);
</script>
<template>
    <div v-if="order" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <OrderForm :order="order" @submit:order="onUpdateOrder" @delete:order="onDeleteOrder" />
        <p>{{ message }}</p>
    </div>
</template>