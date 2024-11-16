import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import VueLazyload from 'vue-lazyload';
import { createApp } from 'vue'; // Import Vue
import App from './App.vue'; // Import component gốc
import router from './router'; // Import router mà bạn đã tạo
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient();
const loadimage = 'assets/slider1.png';
const errorimage = 'assets/logo.png';

// Tạo ứng dụng Vue, sử dụng router và mount vào phần tử #app
createApp(App)
  .use(VueLazyload, {
    preLoad: 1.3,
    error: errorimage, // Sửa đường dẫn hình ảnh
    loading: loadimage, // Sửa đường dẫn hình ảnh
    attempt: 1
  })
  .use(router) // Đăng ký router
  .use(VueQueryPlugin, { queryClient })
  .mount('#app'); // Mount vào thẻ có id 'app'
