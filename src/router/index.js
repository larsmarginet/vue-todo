import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import store from '../store/index'
import Todos from '../views/Todos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Todos
  },
  {
    path: '/todos/:id',
    name: 'Todo',
    meta: { requiresAuth: true },
    props: true,
    component: () => import(/* webpackChunkName: "todo" */ '../views/TodoDetail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresUnAuth: true },
    component: () => import(/* webpackChunkName: "login" */ '../views/AuthLogin.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: { requiresUnAuth: true },
    component: () => import(/* webpackChunkName: "signup" */ '../views/AuthSignup.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth && await !store.getters.user) {
      next('/login');
    } else if (to.meta.requiresUnAuth && await store.getters.user) {
      next('/');
    } else {
      next();
  }
})

router.beforeResolve((to, _, next) => {
  if (to.path) {
    NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

export default router
