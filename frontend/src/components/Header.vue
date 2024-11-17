<template>
  <header class="header">
    <!-- <div class="logo">
      <img src="@/image-shop/logo.png" alt="Logo" />
    </div> -->
    <div class="logo" @click="goToHomePage" style="cursor: pointer">
      <img src="@/assets/image-shop/logo.png" alt="Logo" />
    </div>
    <div class="menu-container">
      <ul class="menu">
        <li class="menu-item">
          <router-link to="/iphone">IPHONE</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/macbook">MACBOOK</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/apple-watch">APPLE WATCH</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/air-pod">AIR POD</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/mac-mini">MAC MINI</router-link>
        </li>
        <li v-if="isLoggedIn" class="menu-item">
          <router-link to="/product_admin">CRUD product</router-link>
        </li>
        <li v-if="isLoggedIn" class="menu-item">
          <router-link to="/customer_admin">CRUD customer</router-link>
        </li>
        <li v-if="isLoggedIn" class="menu-item">
          <router-link to="/order_admin">CRUD order</router-link>
        </li>


      </ul>
    </div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Tìm kiếm sản phẩm..." @keyup.enter="searchProduct" />
      <button @click="searchProduct">Tìm kiếm</button>
    </div>
    <a href="/cart" class="cart ms-3">
      <i class="fas fa-shopping-cart"></i>
      <span class="number badge bg-danger">Giỏ hàng</span>
    </a>
    <button v-if="!isLoggedIn" @click="login" class="login-btn">
      Login
    </button>
    <button v-if="isLoggedIn" @click="logout" class="logout-btn">
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
  router.push({ name: 'iphoneview1' });
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
  padding: 20px 40px;
  background-color: #333;
  color: white;
}

.logo img {
  max-height: 80px;
  height: auto;
  border-radius: 10px;
}

.menu-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.menu {
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu-item a {
  color: white;
  padding: 15px 20px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
}

.menu-item a:hover {
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 5px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  width: 250px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

.search-bar button {
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #396ce8;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}

.search-bar button:hover {
  background-color: #555;
}

.cart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  padding: 0 10px;
  background-color: #396ce8;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #396ce8;
  border-radius: 5px;
  cursor: pointer;
}

.cart:hover {
  background-color: #2a52c6;
}

.cart .number {
  font-size: 0.8rem;
  background-color: #d9534f;
  color: white;
  border-radius: 50%;
  padding: 3px 7px;
  margin-left: 5px;
}

button {
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #396ce8;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}

button.logout-btn {
  background-color: #d9534f;
}

button:hover {
  background-color: #2a52c6;
}

 .logout-btn {
  margin-left: 15px;
}
.login-btn {
   margin-left: 15px;
 }
.logout-btn:hover {
  background-color: #c9302c;
}
</style>
