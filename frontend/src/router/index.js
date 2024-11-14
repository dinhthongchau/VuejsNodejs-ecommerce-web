import { createWebHistory, createRouter } from 'vue-router';

import ProductPage from '@/views/ProductPage.vue';
import CustomerPage from '@/views/CustomerPage.vue';
const routes = [
  {
    path: '/',
    name: 'iphoneview1',
    component: () => import('@/views/IphoneView.vue')
  },
  {
    path: '/product_admin',
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
  { path: '/cart', name: 'product.cart', component: () => import('@/views/Cart.vue') },
  {
    path: '/productedit/:product_id',
    name: 'product.edit',
    component: () => import('@/views/ProductEdit.vue')
  },
  { path: '/customer_admin', name: 'customerpage', component: CustomerPage },
  {
    path: '/customers/add',
    name: 'customer.add',
    component: () => import('@/views/CustomerAdd.vue')
  },
  {
    path: '/customeredit/:customer_id',
    name: 'customer.edit',
    component: () => import('@/views/CustomerEdit.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
