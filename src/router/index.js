import { createRouter, createWebHistory } from 'vue-router'
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
})

export default router
