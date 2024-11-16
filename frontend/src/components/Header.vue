<template>
  <header class="header">
    <!-- <div class="logo">
      <img src="@/image-shop/logo.png" alt="Logo" />
    </div> -->
    <div
      class="logo"
      @click="goToHomePage"
      style="cursor: pointer"
    >
      <img
        src="@/assets/image-shop/logo.png"
        alt="Logo"
      />
    </div>
    <div class="menu-container">
      <ul class="menu">
        <li class="menu-item">
          <a href="/iphone">IPHONE</a>
        </li>
        <li class="menu-item">
          <a href="/">MACBOOK</a>
        </li>
        <li class="menu-item">
          <a href="/">IPAD</a>
        </li>
        <!-- <li class="menu-item">
          <a href="/">APPLE WATCH</a>
        </li>
        <li class="menu-item">
          <a href="/">TAI NGHE, LOA</a>
        </li>
        <li class="menu-item">
          <a href="/">PHỤ KIỆN</a>
        </li> -->
        <li v-if="isLoggedIn" class="menu-item">
          <a href="/product_admin">crud product</a>
        </li>
        <li v-if="isLoggedIn" class="menu-item">
          <a href="/customer_admin">crud customer</a>
        </li>
        <li v-if="isLoggedIn" class="menu-item">
          <a href="/order_admin">crud order</a>
        </li>
      </ul>
    </div>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm sản phẩm..."
        @keyup.enter="searchProduct"
      />
      <button @click="searchProduct">Tìm kiếm</button>
    </div>
    <a
      href="/cart"
      class="cart ms-3"
    >
      <i class="fas fa-shopping-cart"></i>
      <span class="number badge bg-danger">Giỏ hàng</span>
    </a>
    <button
      v-if="!isLoggedIn"
      @click="login"
    >
      Login
    </button>
    <button
      v-if="isLoggedIn"
      @click="logout"
      class="logout-btn"
    >
      Logout
    </button>
  </header>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import makeAdminService from '@/services/admins.service';

const router = useRouter();
const searchQuery = ref('');
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

const login = () => {
  console.error('hello');
  router.push({ name: 'Login' });
};

const logout = async () => {
  await makeAdminService.logout();
  localStorage.clear();
  isLoggedIn.value = false;
  //router.push({ name: 'Login'});
};
watchEffect(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
});

const searchProduct = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'iphoneview', query: { search: searchQuery.value } });
  }
};

// Hàm điều hướng về trang chủ ProductPage.vue
const goToHomePage = () => {
  router.push({ name: 'productpage' });
};

// Theo dõi thay đổi trong searchQuery
watch(searchQuery, (newValue) => {
  if (newValue.trim()) {
    searchProduct();
  }
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.logo img {
  max-height: 60px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;
  /* Khoảng cách giữa logo và menu */
}

.menu-container {
  flex-grow: 1;
  /* Để menu chiếm toàn bộ không gian còn lại */
}

.menu {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu-item a {
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  font-size: 1.1rem;
  /* Tăng kích thước chữ */
  font-weight: 500;
  /* Làm đậm chữ */
}

.menu-item a:hover {
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 5px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 5px;
  border: none;
  border-radius: 5px;
}

.search-bar button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #396ce8;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #555;
}
</style>
