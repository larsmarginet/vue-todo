import { createStore } from 'vuex'
import auth from './auth/index.js'
import todos from './todos/index.js'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    todos
  }
})
