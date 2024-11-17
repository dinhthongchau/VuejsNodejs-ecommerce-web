<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import CustomerForm from '@/components/CustomerForm.vue';
import customersService from '@/services/customers.service';
const props = defineProps({
    customerId: { type: String, required: true }
});
const router = useRouter();
const route = useRoute();
const customer = ref(null);
const message = ref('');

const customerId = route.params.customer_id;
console.log('Customer ID here:', customerId);

onMounted(() => {
    if (!customerId) {
        console.error('Customer ID is undefined');
        return;
    }
    customersService.fetchCustomer(customerId)
        .then((customer) => {
            console.log('Customer details:', customer);
        })
        .catch((error) => {
            console.error('Error fetching customer:', error);
        });
});

async function getCustomer(customer_id) {
    try {
        console.log("customer_id có được truyền không:", customer_id);
        console.log("lỗi ở đây");
        customer.value = await customersService.fetchCustomer(customer_id);
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
async function onUpdateCustomer(customer) {
    try {
        await customersService.updateCustomer(customerId, customer);
        message.value = 'Customer được cập nhật thành công.';
    } catch (error) {
        console.log(error);
        message.value = 'Lỗi cập nhật Customer.';
    }
}


async function onDeleteCustomer(customer_id) {
    if (confirm('Bạn muốn xóa Customer này?')) {
        try {
            await customersService.deleteCustomer(customer_id);
            router.push({ name: 'customerpage' });
        } catch (error) {
            console.log(error);
        }
    }
}
getCustomer(customerId);

</script>
<template>
    <div v-if="customer" class="page">
        <h4>Chỉnh sửa Customer</h4>
        <CustomerForm :customer="customer" @submit:customer="onUpdateCustomer" @delete:customer="onDeleteCustomer" />
        <p>{{ message }}</p>
    </div>
</template>