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
  /* Tăng khoảng cách từ đầu trang */
  max-width: 1200px;
  /* Đặt độ rộng tối đa cho nội dung */
  margin-left: auto;
  margin-right: auto;
  /* Căn giữa nội dung */
  padding: 20px;
  /* Thêm khoảng cách padding xung quanh nội dung */
}

.page {
  max-width: 1500px;
  /* Độ rộng tối đa của mỗi trang nội dung */
  margin: 20px auto;
  /* Căn giữa nội dung trang */
  padding: 10px;
  background-color: #f8f9fa;
  /* Màu nền nhẹ cho phần nội dung */
  border-radius: 8px;
  /* Bo tròn các góc */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  /* Hiệu ứng đổ bóng */
}
</style>