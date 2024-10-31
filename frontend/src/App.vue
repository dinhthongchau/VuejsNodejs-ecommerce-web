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
.page {
max-width: 400px;
margin: auto;
}

.content {
  margin-top: 100px;
  
}
</style>