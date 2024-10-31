import { createWebHistory, createRouter } from 'vue-router';

import ProductPage from '@/views/ProductPage.vue';
const routes = [
  {
    path: '/', 
    name: 'productpage',
    component: ProductPage
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
    path: '/iphone', 
    name: 'iphoneview',
    component: () => import('@/views/IphoneView.vue')
  },
  {
    path: '/product/:id',
    name: 'product.detail',
    component: () => import('@/views/ProductDetail.vue')
  },
  { path: '/cart', 
    name: 'product.cart', 
    component: () => import('@/views/Cart.vue') 
  }, 
  { path: '/productedit/:product_id',
    name: 'product.edit',
    component: () => import('@/views/ProductEdit.vue')}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
