import AboutPage from '@/pages/AboutPage.vue'
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import OrdersPage from '@/pages/OrdersPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import ProductsPage from '@/pages/ProductsPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/profile',
    component: ProfilePage,
    children: [
      {
        path: 'orders',
        component: OrdersPage,
      },
    ],
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

export default router
