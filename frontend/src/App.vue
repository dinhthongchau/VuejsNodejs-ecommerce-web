<template>
  <div id="app">
    <HeaderComponent />
    <!-- Nội dung chính của trang -->
     <div class="container mt-3">
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
</style>