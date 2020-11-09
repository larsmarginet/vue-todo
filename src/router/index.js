import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
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
    props: true,
    component: () => import(/* webpackChunkName: "todo" */ '../views/TodoDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

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
