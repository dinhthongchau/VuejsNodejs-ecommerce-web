<template>
  <div id="app">
    <HeaderComponent />
    
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
.content {
  margin-top: 120px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}

.page {
  max-width: 1500px;
  margin: 20px auto;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>