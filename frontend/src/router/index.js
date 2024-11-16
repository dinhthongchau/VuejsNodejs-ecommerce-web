import { createWebHistory, createRouter } from 'vue-router';

import ProductPage from '@/views/ProductPage.vue';
import CustomerPage from '@/views/CustomerPage.vue';
import OrderPage from '@/views/OrderPage.vue';
const routes = [
  {
    path: '/',
    name: 'iphoneview1',
    component: () => import('@/views/IphoneView.vue')
  },
  {
    path: '/product_admin',
    name: 'productpage',
    component: ProductPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/products/add',
    name: 'product.add',
    component: () => import('@/views/ProductAdd.vue'),
    meta: { requiresAuth: true }
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
    component: () => import('@/views/ProductEdit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/customer_admin',
    name: 'customerpage',
    component: CustomerPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers/add',
    name: 'customer.add',
    component: () => import('@/views/CustomerAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/customeredit/:customer_id',
    name: 'customer.edit',
    component: () => import('@/views/CustomerEdit.vue'),
    meta: { requiresAuth: true }
  },

  { path: '/order_admin', name: 'orderpage', component: OrderPage, meta: { requiresAuth: false } },
  {
    path: '/orders/add',
    name: 'order.add',
    component: () => import('@/views/OrderAdd.vue')
  },
  {
    path: '/orderedit/:order_id',
    name: 'order.edit',
    component: () => import('@/views/OrderEdit.vue')
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('@/views/AdminLogin.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        next('/');
      } else next();
    },
    meta: { requiresAuth: false } // Cho phép truy cập mà không cần đăng nhập
  },
  // {
  //   path: '/logout/',
  //   name: 'Logout',
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/logout/',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        // Nếu chưa đăng nhập, chuyển hướng về trang chính
        //toast.error('Bạn chưa đăng nhập thì đừng vào /logout nhé.');

          next('/'); // Chuyển hướng về trang chính sau khi thông báo lỗi
 
      } else {
        // Thực hiện logic đăng xuất
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('admin_username');
        alert('Bạn đã đăng xuất thành công!');
        toast.success('Bạn đã đăng xuất thành công!');

        next('/'); // Chuyển hướng về trang chính sau khi đăng xuất
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Kiểm tra trạng thái đăng nhập

  // Kiểm tra các route yêu cầu xác thực
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('Bạn không có quyền truy cập! Vui lòng đăng nhập nếu bạn là người quản trị');
    next('/'); // Chuyển hướng về trang login
  } else {
    next(); // Cho phép tiếp tục nếu không yêu cầu xác thực hoặc đã đăng nhập
  }
});

export default router;
