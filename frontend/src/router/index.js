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
  },
  {
    path: '/products/add',
    name: 'product.add',
    component: () => import('@/views/ProductAdd.vue')
  },
  {
    path: '/iphone', // Đường dẫn cho iPhone
    name: 'iphoneview',
    component: () => import('@/views/IphoneView.vue')
  },
  {
    path: '/product/:id',
    name: 'product.detail',
    component: () => import('@/views/ProductDetail.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
