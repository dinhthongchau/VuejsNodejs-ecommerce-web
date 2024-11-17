import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import VueLazyload from 'vue-lazyload';
import { createApp } from 'vue'; 
import App from './App.vue'; 
import router from './router'; 
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient();
const loadimage = 'assets/slider1.png';
const errorimage = 'assets/logo.png';


createApp(App)
  .use(VueLazyload, {
    preLoad: 1.3,
    error: errorimage,
    loading: loadimage, 
    attempt: 1
  })
  .use(router)
  .use(VueQueryPlugin, { queryClient })
  .mount('#app'); // Mount vào thẻ có id 'app'
