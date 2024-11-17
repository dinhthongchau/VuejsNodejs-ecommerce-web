<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import OrderCard from '@/components/OrderCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import OrderList from '@/components/OrderList.vue';
import MainPagination from '@/components/MainPagination.vue';
import ordersService from '@/services/orders.service';

const router = useRouter();
const route = useRoute();
const totalPages = ref(1);
const currentPage = computed(() => {
    const page = Number(route.query?.page);
    if (Number.isNaN(page) || page < 1) return 1;
    return page;
});
const orders = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');


const searchableOrders = computed(() =>
    orders.value.map((order) => {
        const { order_date, order_note } = order;
        return [order_date, order_note].join('');
    })
);

const filteredOrders = computed(() => {
    if (!searchText.value) return orders.value;
    return orders.value.filter((order, index) =>
        searchableOrders.value[index].includes(searchText.value)
    );
});

const selectedOrder = computed(() => {
    if (selectedIndex.value < 0) return null;
    console.log("seleted order: ", filteredOrders.value[selectedIndex.value]);
    return filteredOrders.value[selectedIndex.value];
});

async function retrieveOrders(page) {
    try {
        const chunk = await ordersService.fetchOrders(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        orders.value = chunk.orders.sort(
            (current, next) => current.order_date.localeCompare(next.order_date)
        );
        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
}

async function onDeleteOrders() {
    if (confirm('Bạn muốn xóa tất cả ORDER DETAIL?')) {
        try {
            await ordersService.deleteAllOrders();
            totalPages.value = 1;
            orders.value = [];
            selectedIndex.value = -1;
            changeCurrentPage(1);
        } catch (error) {
            console.log(error);
        }
    }
}

function goToAddOrder() {
    router.push({ name: 'order.add' });
}

function changeCurrentPage(page) {
    router.push({ name: 'orderpage', query: { page } });
}

watch(searchText, () => (selectedIndex.value = -1));
watch(currentPage, () => retrieveOrders(currentPage.value), { immediate: true });
watch(searchText, () => {
    console.log("Search text changed:", searchText.value); // In giá trị searchText
    selectedIndex.value = -1;
});

watch(filteredOrders, () => {
    console.log("Filtered Orders:", filteredOrders.value); // Kiểm tra sản phẩm đã lọc
});

</script>

<template>
    <div class="page row mb-5">

        <div class="mt-3 col-md-6">
            <h4>
                Danh sách ORDER DETAIL
                <i class="fas fa-box"></i>
            </h4>
            <div class="my-3">
                <InputSearch v-model="searchText" />
            </div>
            <OrderList v-if="filteredOrders.length > 0" :orders="filteredOrders"
                v-model:selected-index="selectedIndex" />
            <p v-else>
                Không có đơn hàng nào.
            </p>
            <div class="mt-3 d-flex flex-wrap justify-content-round align-items-center">
                <MainPagination :total-pages="totalPages" :current-page="currentPage"
                    @update:current-page="changeCurrentPage" />
                <div class="w-100"></div>
                <button class="btn btn-sm btn-primary" @click="retrieveOrders(currentPage)">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddOrder">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="onDeleteOrders">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="selectedOrder">
                <h4>
                    Chi tiết ORDER DETAIL
                    <i class="fas fa-info-circle"></i>
                </h4>
                <OrderCard :order="selectedOrder" />
                <router-link v-if="selectedOrder" :to="{
                    name: 'order.edit',
                    params: { order_id: selectedOrder.order_id }
                }">
                    <span class="mt-2 badge text-bg-warning"> <i class="fas fa-edit"></i> Chỉnh sửa ORDER DETAIL</span>
                </router-link>
            </div>
        </div>
    </div>
</template>



<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>
