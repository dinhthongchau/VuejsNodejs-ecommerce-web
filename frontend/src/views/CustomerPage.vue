<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import CustomerCard from '@/components/CustomerCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import CustomerList from '@/components/CustomerList.vue';
import MainPagination from '@/components/MainPagination.vue';
import customersService from '@/services/customers.service';

const router = useRouter();
const route = useRoute();
const totalPages = ref(1);
const currentPage = computed(() => {
    const page = Number(route.query?.page);
    if (Number.isNaN(page) || page < 1) return 1;
    return page;
});
const customers = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');


const searchableCustomers = computed(() =>
    customers.value.map((customer) => {
        const { customer_name, customer_email, customer_phone } = customer;

        return [customer_name, customer_email, customer_phone].join(' ').toLowerCase();
    })
);


const filteredCustomers = computed(() => {
    if (!searchText.value) return customers.value;

    const lowerCaseSearchText = searchText.value.toLowerCase();
    return customers.value.filter((customer, index) =>
        searchableCustomers.value[index].includes(lowerCaseSearchText)
    );
});

const selectedCustomer = computed(() => {
    if (selectedIndex.value < 0) return null;
    console.log("seleted customer: ", filteredCustomers.value[selectedIndex.value]);
    return filteredCustomers.value[selectedIndex.value];
});

async function retrieveCustomers(page) {
    try {
        const chunk = await customersService.fetchCustomers(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        customers.value = chunk.customers.sort(
            (current, next) => current.customer_name.localeCompare(next.customer_name)
        );
        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
}

async function onDeleteCustomers() {
    if (confirm('Bạn muốn xóa tất cả KHÁCH HÀNG?')) {
        try {
            await customersService.deleteAllCustomers();
            totalPages.value = 1;
            customers.value = [];
            selectedIndex.value = -1;
            changeCurrentPage(1);
        } catch (error) {
            console.log(error);
        }
    }
}

function goToAddCustomer() {
    router.push({ name: 'customer.add' });
}

function changeCurrentPage(page) {
    router.push({ name: 'customerpage', query: { page } });
}

watch(searchText, () => (selectedIndex.value = -1));
watch(currentPage, () => retrieveCustomers(currentPage.value), { immediate: true });
watch(searchText, () => {
    console.log("Search text changed:", searchText.value);
    selectedIndex.value = -1;
});

watch(filteredCustomers, () => {
    console.log("Filtered Customers:", filteredCustomers.value);
});

</script>

<template>
    <div class="page row mb-5">

        <div class="mt-3 col-md-6">
            <h4>
                Danh sách KHÁCH HÀNG
                <i class="fas fa-box"></i>
            </h4>
            <div class="my-3">
                <InputSearch v-model="searchText" />
            </div>
            <CustomerList v-if="filteredCustomers.length > 0" :customers="filteredCustomers"
                v-model:selected-index="selectedIndex" />
            <p v-else>
                Không có khách hàng nào.
            </p>
            <div class="mt-3 d-flex flex-wrap justify-content-round align-items-center">
                <MainPagination :total-pages="totalPages" :current-page="currentPage"
                    @update:current-page="changeCurrentPage" />
                <div class="w-100"></div>
                <button class="btn btn-sm btn-primary" @click="retrieveCustomers(currentPage)">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddCustomer">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="onDeleteCustomers">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="selectedCustomer">
                <h4>
                    Chi tiết KHÁCH HÀNG
                    <i class="fas fa-info-circle"></i>
                </h4>
                <CustomerCard :customer="selectedCustomer" />
                <router-link v-if="selectedCustomer" :to="{
                    name: 'customer.edit',
                    params: { customer_id: selectedCustomer.customer_id }
                }">
                    <span class="mt-2 badge text-bg-warning"> <i class="fas fa-edit"></i> Chỉnh sửa KHÁCH HÀNG</span>
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
