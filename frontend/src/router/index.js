import { createWebHistory, createRouter } from 'vue-router';

import ProductBook from '@/views/ProductBook.vue';
const routes = [
  {
    path: '/', // Đường dẫn gốc hiển thị danh sách sản phẩm
    name: 'productbook',
    component: ProductBook
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
