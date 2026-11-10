import AboutPage from '@/pages/AboutPage.vue'
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import OrdersPage from '@/pages/OrdersPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import ProductsPage from '@/pages/ProductsPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import CartPage from '@/pages/CartPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage,
  },
  {
    path: '/products/:id',
    component: ProductPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
    children: [
      {
        path: 'orders',
        component: OrdersPage,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'products' }
  }
})

export default router
