<template>
  <div id="app">
    <HeaderComponent />
    <!-- Nội dung chính của trang -->
    <div class="content">
      <router-view />
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';
import FooterComponent from './components/Footer.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  }
}
</script>
<style>
.page {
max-width: 400px;
margin: auto;
}

.content {
  margin-top: 100px;
  /* Điều chỉnh kích thước này theo chiều cao của header */
}
</style>