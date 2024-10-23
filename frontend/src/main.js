
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createApp } from 'vue'; // Import Vue
import App from './App.vue'; // Import component gốc
import router from './router'; // Import router mà bạn đã tạo

// Tạo ứng dụng Vue, sử dụng router và mount vào phần tử #app
createApp(App)
  .use(router) // Đăng ký router
  .mount('#app'); // Mount vào thẻ có id 'app'
