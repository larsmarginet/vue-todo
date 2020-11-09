import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../views/Todos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Todos
  },
  {
    path: '/Todos/:id',
    name: 'Todo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TodoDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
