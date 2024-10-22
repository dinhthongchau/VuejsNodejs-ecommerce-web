<template>
  <footer class="footer bg-dark text-light">
    <div class="container py-4">
      <div class="row">
        <div class="col-md-4">
          <div class="logo-foot">
            <a href="/">
              <img src="../image-shop/logo.png" alt="Logo" class="img-fluid" />
            </a>
          </div>
          <div class="footer-social">
            <p>Kết nối với chúng tôi</p>
            <a href="https://www.facebook.com" target="_blank" class="text-light me-2">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" class="text-light me-2">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://zalo.me" target="_blank" class="text-light">
              <i class="fab fa-zalo"></i>
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <h5>Hỗ trợ khách hàng</h5>
          <ul class="list-unstyled">
            <li><a href="/huong-dan-mua-hang" class="text-light">Hướng dẫn mua hàng</a></li>
            <li><a href="/chinh-sach-giao-hang" class="text-light">Chính sách giao hàng</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Liên hệ</h5>
          <p class="text-light">Điện thoại: <a href="tel:1900969642" class="text-light">1900.0000</a></p>
          <p class="text-light">Email: hotroTHshopphone@gmail.com</p>
        </div>
      </div>
      <div class="text-center py-3">
        <p>© 2024. The TH Shop Phone.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
}

.logo-foot img{
    max-height: 80px;
}
</style>
