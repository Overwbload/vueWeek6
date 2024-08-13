import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'adminProduct',
        component: () => import('../views/dashboard/AdminProduct.vue')
      },
      {
        path: 'adminOrder',
        component: () => import('../views/dashboard/AdminOrder.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
